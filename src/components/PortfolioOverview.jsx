import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { getUserAssets } from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const PortfolioOverview = () => {
  const { user,userAssets ,loading} = useAuth();
  
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        Loading portfolio...
      </div>
    );
  }

  if ( userAssets.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        No userAssets yet.
      </div>
    );
  }

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
  const profitPercent =
    totalInvested > 0 ? ((profitLoss / totalInvested) * 100).toFixed(2) : 0;

  return (
    <div className="bg-white min-h-[200px] flex flex-col rounded-md p-6 mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString()}`}
        />
        <Card
          title="Total Invested"
          value={`$${totalInvested.toLocaleString()}`}
        />
        <Card
          title="Overall P&L"
          value={`${profitLoss >= 0 ? "+" : ""}$${profitLoss.toFixed(
            2
          )} (${profitPercent}%)`}
          color={profitLoss >= 0 ? "text-green-600" : "text-red-500"}
        />
      </div>
    </div>
  );
};
