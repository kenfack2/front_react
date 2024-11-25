"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RetraitForm() {
  const [formData, setFormData] = useState({
    telephone: '',
    montant: "",
  });
  
  const router = useRouter(); // Pour gérer les redirections

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation des champs
  if (!formData.telephone || !formData.montant) {
    alert("Tous les champs sont requis !");
    return;
  }

  const montant = parseFloat(formData.montant);
  if (isNaN(montant) || montant <= 0) {
    alert("Le montant doit être positif !");
    return;
  }

  try {
    // Récupération des informations du compte
    const responseCompte = await fetch(`/api/compte/getCompte/${formData.telephone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!responseCompte.ok) {
      if (responseCompte.status === 404) {
        alert("Compte non trouvé. Veuillez vérifier le numéro de téléphone.");
        return;
      }
      throw new Error(`Erreur serveur : ${responseCompte.status}`);
    }

    const accountData = await responseCompte.json();

    // Vérification du solde
    if (accountData.solde < montant) {
      alert("Solde insuffisant pour effectuer ce retrait.");
      return;
    }

    // Effectuer le retrait
    const responseRetrait = await fetch("/api/transaction/retrait", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (responseRetrait.ok) {
      alert("retrait effectuée avec succès !");
      router.push("/profile/personnel"); // Redirige vers la page d'accueil
    } else {
      const errorData = await responseRetrait.json();
      alert(errorData.message || "Erreur lors du retrait !");
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
    alert("Une erreur s'est produite. Veuillez réessayer.");
  }
};
 

  return (
    <div className="container mt-5 p-4" style={{
      maxWidth: "600px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 className="text-center mb-4 text-danger">Effectuer un Retrait</h2>
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
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
            <i className="bi bi-arrow-left-circle me-2"></i>Retour
          </button>
          <button type="submit" className="btn btn-danger">
            <i className="bi bi-check-circle me-2"></i>Valider le Retrait
          </button>
        </div>
      </form>
    </div>
  );
}

