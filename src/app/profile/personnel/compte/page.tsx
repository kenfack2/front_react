"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemandeCreationCompte({ clientId }) {
  const [formData, setFormData] = useState({
    clientId: clientId || '', // Injecté automatiquement
    nom: '',
    cni: '',
    phoneNumber: '',
    password: '',
    typeBanque: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const bankTypes = ['CCA', 'EXPRESS_UNION', 'UBA'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const { phoneNumber } = formData;

        const userIdResponse = await fetch(`/api/user/getuserPhone/${phoneNumber}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!userIdResponse.ok) {
            if (userIdResponse.status === 404) {
                throw new Error("Utilisateur non trouvé. Veuillez vérifier le numéro de téléphone.");
            }
            throw new Error(`Erreur API : ${userIdResponse.status}`);
        }

        const userId = await userIdResponse.text(); // Si l'API retourne un `int` en JSON, utilisez `await userIdResponse.json()`

        if (!userId || isNaN(userId)) {
            throw new Error("L'ID utilisateur récupéré est invalide.");
        }

        // Stocker l'ID utilisateur dans le localStorage
        localStorage.setItem("userId", userId);
								localStorage.setItem("phoneNumber", phoneNumber);
        const updatedFormData = {
            ...formData,
            clientId: parseInt(userId, 10),
        };

        const response = await fetch("/api/demande/adddemande", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
        });

            setMessage("Demande soumise avec succès !");
            setTimeout(() => router.push("/profile/personnel"), 1000);

    } catch (error) {
        console.error("Erreur réseau ou serveur :", error);
        setMessage(`Erreur : ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
};




  return (
    <div className="container mt-5">
      <div className="p-4 mx-auto bg-light rounded shadow" style={{ maxWidth: '500px' }}>
        <h2 className="text-center text-primary mb-4">
          <i className="bi bi-person-plus-fill me-2"></i> Création d'un compte bancaire
        </h2>

        {message && (
          <div
            className={`alert ${
              message.includes('réussie') ? 'alert-success' : 'alert-danger'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">
              <i className="bi bi-person-fill me-2"></i> Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              placeholder="Ex: Kenfack Rostand"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>

          {/* CNI */}
          <div className="mb-3">
            <label htmlFor="cni" className="form-label">
              <i className="bi bi-card-text me-2"></i> Numéro CNI
            </label>
            <input
              type="text"
              className="form-control"
              id="cni"
              name="cni"
              placeholder="Ex: 123234567890"
              value={formData.cni}
              onChange={handleChange}
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              <i className="bi bi-telephone-fill me-2"></i> Numéro de téléphone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Ex: 6 99 34 56 78"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock-fill me-2"></i> Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Entrez un mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Type de banque */}
          <div className="mb-3">
            <label htmlFor="typeBanque" className="form-label">
              <i className="bi bi-bank me-2"></i> Type de Banque
            </label>
            <select
              className="form-select"
              id="typeBanque"
              name="typeBanque"
              value={formData.typeBanque}
              onChange={handleChange}
            >
              <option value="">Sélectionner un type de banque</option>
              {bankTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={isSubmitting}
            >
              <i className="bi bi-check-circle me-2"></i>
              {isSubmitting ? 'En cours...' : 'Soumettre'}
            </button>
            <Link href="/profile/personnel">
              <button type="button" className="btn btn-danger">
                <i className="bi bi-arrow-left-circle me-2"></i>Retour
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

