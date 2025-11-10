import React, { useEffect, useState } from "react";
import { getUserData } from "../../firebase/firestore";
import { auth } from "../../firebase/config"; // ✅ make sure you import this
import { Card } from "../../components/Card";
import { AssetTable } from "../../components/AssetTable";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PortfolioOverview } from "../../components/PortfolioOverview";

export const Dashboard = () => {
  const { userData } = useAuth();
  return (
    <div className="w-[80%] mx-auto">
      <div className="p-6 text-neutral-700 flex justify-between">
        <div>
          {userData ? (
            <h3 className="font-bold text-3xl ">
              Hi,{" "}
              <span className="font-bold text-emerald-400">
                {userData.profile.name}
              </span>
            </h3>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <Link
            to={"/addassets"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow "
          >
          + Add Asset
          </Link>
        </div>
      </div>

      <div className="bg-white min-h-[250px] flex flex-col rounded-md p-6 mx-auto shadow-xl">
        <h3 className="font-bold text-xl text-neutral-700 mb-6 ">
          Portfolio Overview
        </h3>

        {userData?.assets.length > 0 ? (
          <PortfolioOverview />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-50 rounded-lg border border-gray-200 space-y-5">
            <p className="text-gray-500 text-lg">No assets found</p>
            <Link
              to="/addassets"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow transition-transform duration-200 hover:scale-105"
            >
              + Add Asset
            </Link>
          </div>
        )}
      </div>

      <AssetTable />
    </div>
  );
};
