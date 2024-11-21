"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]); // État pour les notifications
  const router = useRouter(); // Utilisation de useRouter pour naviguer

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId1 = localStorage.getItem("userId"); // Récupère l'ID utilisateur
        const userId = parseInt(userId1, 10);

        if (!userId) {
          console.error("Utilisateur non connecté ou ID manquant.");
          return;
        }

        console.log("ID utilisateur envoyé à l'API :", userId);

        const response = await fetch(
          `/api/notification/getnotificationbyclientid/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data); // Met à jour les notifications
        } else {
          const errorMessage = await response.text();
          console.error(
            "Erreur lors du chargement des notifications :",
            errorMessage || response.statusText
          );
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div
      className="container mt-5 p-4"
      style={{
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-center mb-4 text-info">Notifications</h2>
      <div className="list-group">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{notification.message}</span>
              <span className="badge bg-secondary">
                {new Date(notification.date).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center">Aucune notification reçue.</p>
        )}
      </div>
      {/* Bouton de retour */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => router.back()}
        >
          Retour
        </button>
      </div>
    </div>
  );
}

