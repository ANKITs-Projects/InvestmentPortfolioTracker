import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const { user, userData, logout } = useAuth();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-center">
          <h3 className="text-gray-600 text-sm font-medium">
            Built with ❤️ by{" "}
            <a
              href="https://ankits-projects.github.io/MyFinalPortfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Ankit Gupta
            </a>{" "}
            · Powered by React + TailwindCSS
          </h3>
        </div>
      </div>
    </footer>
  );
};
