"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DepotForm() {
  const [formData, setFormData] = useState({
    telephone: "",
    montant: "",
  });
  const [message, setMessage] = useState(""); // Message d'erreur ou de succès
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour désactiver le bouton pendant la soumission

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(""); // Réinitialiser le message

    // Validation côté frontend
    if (!formData.telephone || !formData.montant) {
      setMessage("Tous les champs sont requis.");
      setIsSubmitting(false);
      return;
    }

    if (parseFloat(formData.montant) <= 0) {
      setMessage("Le montant doit être strictement positif.");
      setIsSubmitting(false);
      return;
    }

    try {
    
    		 // Récupération du numéro de téléphone à partir de `formData`
        const { telephone } = DepotForm;
        // Appel à l'API pour récupérer l'utilisateur correspondant au numéro de téléphone
        const userIdResponse = await fetch(`/api/user/getuserPhone/${telephone}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
						localStorage.setItem("userPhone", userIdResponse);
      const response = await fetch("/api/transaction/depot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Dépôt effectué avec succès ! Transaction ID: ${data.id}`);
        router.push("/profile/personnel");
      } else {
        // Lecture du message d'erreur du serveur
        const errorData = await response.json();
        setMessage(errorData.message || "Erreur lors du dépôt.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 p-4" style={{
      maxWidth: "600px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 className="text-center mb-4 text-primary">Effectuer un Dépôt</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            <i className="bi bi-telephone-fill me-2"></i>Telephone
          </label>
          <input
            type="text"
            className="form-control"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="montant" className="form-label">
            <i className="bi bi-currency-dollar me-2"></i>Montant
          </label>
          <input
            type="number"
            className="form-control"
            id="montant"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            required
            min="0" // Empêche les montants négatifs côté HTML
          />
        </div>
        {message && <p className="text-danger">{message}</p>} {/* Affichage des erreurs */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => router.back()} disabled={isSubmitting}>
            <i className="bi bi-arrow-left-circle me-2"></i>Retour
          </button>
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            <i className="bi bi-check-circle me-2"></i>
            {isSubmitting ? "En cours..." : "Valider le Dépôt"}
          </button>
        </div>
      </form>
    </div>
  );
}

