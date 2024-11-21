import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function HomePage() {
  return (
    <div className="overflow-hidden">
<div className="overflow-hidden">
  {/* Barre de navigation */}
  <nav className="bg-cyan-600 p-4 shadow-md fixed w-full top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      {/* Titre de la barre de navigation */}
      <div className="text-2xl font-bold">
        <a href="#home" className="text-white hover:text-gray-200 transition duration-200">
          Bank Manager
        </a>
      </div>
      
      {/* Menu de navigation */}
      <ul className="flex gap-6 text-white">
        <li>
          <a href="#accounts" className="text-white hover:text-gray-200 transition duration-200">
            Comptes
          </a>
        </li>
        <li>
          <a href="#transactions" className="text-white hover:text-gray-200 transition duration-200">
            Transactions
          </a>
        </li>
        <li>
          <a href="#loans" className="text-white hover:text-gray-200 transition duration-200">
            Prêts
          </a>
        </li>
        <li>
          <a href="#settings" className="text-white hover:text-gray-200 transition duration-200">
            Paramètres
          </a>
        </li>
        <li>
          <a href="#profil" className="text-white hover:text-gray-200 transition duration-200">
            Profil
          </a>
        </li>
        <li>
          <a href="#about" className="text-white hover:text-gray-200 transition duration-200">
            À propos
          </a>
        </li>
      </ul>
    </div>
  </nav>
</div>


      {/* Sections de contenu avec images alignées à droite */}
      <div className="pt-20 h-screen overflow-hidden">
          {/* Section Accueil */}
        <section id="home" className="h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/bank2.jpg" alt="Accueil" width={400} height={250} className="fade-in" />
            <div>
              <h1 className="text-3xl font-bold text-cyan-700">Bienvenue sur Bank Manager</h1>
              <p className="text-gray-700 mt-4">
                Votre solution idéale pour la gestion bancaire moderne et sécurisée. Simplifiez vos processus et accédez facilement à toutes vos données financières.
              </p>
            </div>
          </div>
        </section>

        {/* Section Comptes */}
        <section id="accounts" className="h-screen flex items-center justify-center bg-gray-200">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/compte22.jpg" alt="Comptes" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">Comptes</h2>
              <p className="text-gray-700 mt-4">
                Gérez facilement les comptes de vos clients avec des fonctionnalités détaillées comme le solde, les relevés et les mises à jour en temps réel.
              </p>
            </div>
          </div>
        </section>

        {/* Section Transactions */}
        <section id="transactions" className="h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/ser1.jpg" alt="Transactions" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">Transactions</h2>
              <p className="text-gray-700 mt-4">
                Visualisez et analysez les transactions en temps réel pour une gestion optimale des flux financiers et une transparence totale.
              </p>
            </div>
          </div>
        </section>

        {/* Section Prêts */}
        <section id="loans" className="h-screen flex items-center justify-center bg-gray-200">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/pret2.jpg" alt="Prêts" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">Prêts</h2>
              <p className="text-gray-700 mt-4">
                Consultez les dossiers de prêts, incluant les taux d'intérêt, les échéances et les remboursements en cours.
              </p>
            </div>
          </div>
        </section>

        {/* Section Paramètres */}
        <section id="settings" className="h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/paramcompte.jpg" alt="Paramètres" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">Paramètres</h2>
              <p className="text-gray-700 mt-4">
                Adaptez les réglages de l'application selon vos besoins pour une expérience utilisateur personnalisée.
              </p>
            </div>
          </div>
        </section>

        {/* Section Profil */}
        <section id="profil" className="h-screen flex items-center justify-center bg-gray-200">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/profilo.jpg" alt="Profil" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">Profil</h2>
              <p className="text-gray-700 mt-4">
                Créez un profil sécurisé et accédez à vos informations bancaires de manière confidentielle.
              </p>
              <Link href="/demande">
                <button className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded shadow hover:bg-cyan-700 transition">
                  Commencer
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section À propos */}
        <section id="about" className="h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-row-reverse items-center gap-8">
            <Image src="/about.jpg" alt="À propos" width={400} height={250} className="fade-in" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-700">À propos</h2>
              <p className="text-gray-700 mt-4">
                Découvrez notre mission, nos valeurs et notre engagement à fournir des solutions bancaires fiables et performantes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
