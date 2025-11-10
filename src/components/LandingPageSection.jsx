// ...existing code...
import React from "react";
import landingImg from "../assets/landingImg.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const LandingPageSection = () => {
  const {user, userAssets, loading } = useAuth();

  const totalInvested = userAssets.reduce(
    (acc, asset) =>
      acc + Number(asset.buyPrice) * Number(asset.quantity || asset.qty || 0),
    0
  );

  const portfolioValue = userAssets.reduce(
    (acc, asset) =>
      acc +
      Number(asset.currentPrice || asset.buyPrice) *
        Number(asset.quantity || asset.qty || 0),
    0
  );

  const profitLoss = portfolioValue - totalInvested;
  const profitPercent = totalInvested > 0 ? ((profitLoss / totalInvested) * 100).toFixed(2) : 0;

  return (
    <section className="relative w-full h-screen overflow-hidden -top-16">
      <img
        src={landingImg}
        alt="Landing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 backdrop-blur-sm" />

      <div className="abc relative z-10 mx-auto max-w-7xl px-6 py-24 flex  lg:flex-row items-center justify-center  gap-8 h-full">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Track and grow your investments
          </h1>

          <p className="text-sm sm:text-base text-gray-200 mb-6">
            Monitor portfolios, review transactions and make data-driven
            decisions — all in one place.
          </p>
          {!user &&<Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow transition-transform duration-200 hover:scale-105"
            >
              Get Started
            </Link>}
            {user && userAssets.length ==0 &&<Link
              to="/addassets"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow transition-transform duration-200 hover:scale-105"
            >
              Track your Investment
            </Link>

            }
        </div>

        {/* Optional preview card / stats on large screens */}
        {userAssets.length > 0 && (
          <aside className="hidden lg:flex ml-auto w-80 flex-col gap-4 bg-white/10 p-5 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="text-white text-sm">Portfolio snapshot</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">
                  ${portfolioValue.toFixed(2)}
                </div>
                <div className="text-xs text-white/70">Total value</div>
              </div>
              <div className={`${profitLoss>=0 ? "text-green-400 " : "text-red-500 "} font-semibold`}>{profitPercent}%</div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="text-xs text-white/80">
              Recent activity shows gains across your top holdings.
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};
// ...existing code...
