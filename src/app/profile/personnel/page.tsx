"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Importer useRouter
import { Button, Popover, Overlay } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const router = useRouter(); // Initialiser le hook useRouter
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);
  const [showAccountView, setShowAccountView] = useState(false);
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userPhone =  localStorage.getItem("phoneNumber");


  const fetchAccountData = async (telephone: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/compte/getCompte/${telephone}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const data = await response.json();
      setAccountData(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAccountView) {
      fetchAccountData(userPhone);
    }
  }, [showAccountView]);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
    setTarget(event.target as HTMLButtonElement);
  };

  // Navigation vers les pages spécifiques
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      {!showAccountView ? (
        <div
          className="card shadow-lg p-4 position-relative"
          style={{ maxWidth: '500px', borderRadius: '15px' }}
        >
          <div className="position-absolute top-0 start-0 m-3">
            <Button
              variant="light"
              className="p-2"
              onClick={handleToggle}
            >
              <i className="bi bi-three-dots-vertical fs-4"></i>
            </Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom"
              containerPadding={10}
              rootClose
              onHide={() => setShow(false)}
            >
              <Popover id="popover-basic">
                <Popover.Body>
                  <ul className="list-unstyled m-0">
                    <li>
                      <button
                        className="btn btn-link text-decoration-none w-100 text-start"
                        onClick={() => navigateTo('/profile/personnel/retrait')}
                      >
                        <i className="bi bi-arrow-down-circle me-2"></i> Retrait
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-link text-decoration-none w-100 text-start"
                        onClick={() => navigateTo('/profile/personnel/depot')}
                      >
                        <i className="bi bi-arrow-up-circle me-2"></i> Dépôt
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-link text-decoration-none w-100 text-start"
                        onClick={() => navigateTo('/profile/personnel/notifications')}
                      >
                        <i className="bi bi-bell me-2"></i> Notifications
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-link text-decoration-none w-100 text-start"
                        onClick={() => navigateTo('/profile/personnel/compte')}
                      >
                        <i className="bi bi-person-plus-fill me-2"></i> Créer un compte
                      </button>
                    </li>
                  </ul>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>

          <div className="mb-4">
            <Image
              src="/user-profile.jpg"
              alt="User Profile"
              width={150}
              height={150}
              className="rounded-circle"
            />
          </div>
          <h1 className="text-primary">Bienvenue,</h1>
          <p className="text-muted">
            Accédez à vos comptes, suivez vos transactions et gérez vos finances facilement sur notre plateforme.
          </p>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => setShowAccountView(true)}
          >
            Accéder à votre compte
          </button>
        </div>
      ) : (
        <div
          className="card shadow-lg p-4 position-relative"
          style={{ maxWidth: '500px', borderRadius: '15px' }}
        >
          <div className="mb-4">
            <h2 className="text-primary">Votre Compte</h2>
            {loading && <p className="text-muted">Chargement des informations...</p>}
            {error && <p className="text-danger">{error}</p>}
            {accountData && (
              <div className="text-start">
                <p><strong>Téléphone : </strong>{accountData.telephone}</p>
                <p><strong>Solde : </strong>{accountData.solde} FCFA</p>
                <p><strong>Type de compte : </strong>{accountData.typeBanque}</p>
              </div>
            )}
          </div>
          <button
            className="btn btn-secondary w-100 mt-3"
            onClick={() => setShowAccountView(false)}
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

