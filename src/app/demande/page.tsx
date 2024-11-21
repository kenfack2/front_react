"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter(); // Utilisation du hook useRouter pour naviguer

  // Fonction de navigation
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <div
        className="card shadow-lg p-4 position-relative"
        style={{ maxWidth: "400px", borderRadius: "15px" }}
      >
        {/* Bouton de retour */}
        <button
          className="btn btn-link position-absolute top-0 start-0 m-2 text-decoration-none text-dark"
          onClick={() => navigateTo("/")} // Retour à la page précédente
          style={{ zIndex: 10 }}
        >
          <i className="bi bi-arrow-left-circle fs-4"></i> Retour
        </button>

        {/* Icône en haut */}
        <div
          className="position-absolute top-0 start-50 translate-middle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "80px", height: "80px", marginTop: "-40px" }}
        >
          <i className="bi bi-person-circle fs-1"></i>
        </div>

        <h1 className="text-primary mt-5">Bienvenue</h1>
        <p className="text-muted">
          Connectez-vous ou créez un compte pour accéder à vos services.
        </p>

        {/* Boutons */}
        <div className="d-grid gap-3 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigateTo("/profile")}
          >
            S'inscrire
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigateTo("/profile")}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

