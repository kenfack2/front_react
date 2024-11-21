import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Requêtes vers le service users
      {
        source: "/api/user/:path*", // Toutes les requêtes commençant par /api/user
        destination: "http://localhost:8079/SERVICE-USERS/api/user/:path*", // Redirection vers le service users
      },
      // Requêtes vers le service demande
      {
        source: "/api/demande/:path*", // Toutes les requêtes commençant par /api/demande
        destination: "http://localhost:8079/SERVICE-DEMANDE/api/demande/:path*", // Redirection vers le service demande
      },
      // Requêtes vers le service compte
      {
        source: "/api/compte/:path*", // Toutes les requêtes commençant par /api/compte
        destination: "http://localhost:8079/SERVICE-COMPTE/api/compte/:path*", // Redirection vers le service compte
      },
      // Requêtes vers le service notification
      {
        source: "/api/notification/:path*", // Toutes les requêtes commençant par /api/notification
        destination: "http://localhost:8079/SERVICE-NOTIFICATION/api/notification/:path*", // Redirection vers le service notification
      },
      
      // Requêtes vers le service notification
      {
        source: "/api/transaction/:path*", // Toutes les requêtes commençant par /api/notification
        destination: "http://localhost:8079/SERVICE-TRANSACTION/api/transaction/:path*", // Redirection vers le service notification
      },
    ];
  },
};

export default nextConfig;

