"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        cni: "",
        email: "",
        phoneNumber: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Gestion du bouton d'envoi
    const [message, setMessage] = useState(""); // Retour utilisateur
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/user/adduser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage(`Utilisateur créé avec succès !`);
                setTimeout(() => router.push("/profile/personnel"), 2000);
            } else {
                setMessage("Erreur lors de la création de l'utilisateur.");
            }
        } catch (error) {
            setMessage("Une erreur s'est produite. Veuillez vérifier votre connexion.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div
                className="p-4 mx-auto bg-light rounded shadow-lg"
                style={{ maxWidth: "500px" }}
            >
                <h2 className="text-center text-primary mb-4">
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Inscription
                </h2>

                {message && (
                    <div
                        className={`alert ${
                            message.includes("succès") ? "alert-success" : "alert-danger"
                        }`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Nom d'utilisateur */}
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">
                            <i className="bi bi-person-fill me-2"></i>Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            placeholder="Ex: Kenfack Rostand"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Mot de passe */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <i className="bi bi-lock-fill me-2"></i>Mot de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Entrez un mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CNI */}
                    <div className="mb-3">
                        <label htmlFor="cni" className="form-label">
                            <i className="bi bi-card-text me-2"></i>Numéro CNI
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cni"
                            name="cni"
                            placeholder="Ex: 123234567890"
                            value={formData.cni}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <i className="bi bi-envelope-fill me-2"></i>Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Ex: exemple@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Numéro de téléphone */}
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                            <i className="bi bi-telephone-fill me-2"></i>Numéro de téléphone
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Ex: 6 99 34 56 78"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Boutons */}
                    <div className="d-grid gap-2 d-sm-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary me-sm-2"
                            disabled={isSubmitting} // Désactive pendant l'envoi
                        >
                            <i className="bi bi-check-circle me-2"></i>
                            {isSubmitting ? "En cours..." : "Créer"}
                        </button>
                        <Link href="/demande">
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

