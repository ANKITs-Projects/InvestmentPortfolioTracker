
import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { user,  userData, logout } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-950 to-green-800 bg-clip-text text-transparent">
              Investment Tracker
            </NavLink>
            <nav className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <NavLink
                to="/Profile"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
              {userData?.profile?.name || "Loading..."}
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="text-sm text-gray-700 hover:text-blue-600 px-3 py-1">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};