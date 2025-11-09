import React, { useState } from "react";
import { CryptoCard } from "./CryptoCard";
import { CryptoChart } from "./CryptoChart";
import ErrorBoundary from "../common/ErrorBoundary";
import { SearchBar } from "../SearchBar";

const AVAILABLE_COINS = ["BTC", "ETH"];

export const MarketOverview = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AVAILABLE_COINS.map((symbol) => (
          <button
            key={symbol}
            onClick={() => setSelectedCoin(symbol)}
            className={`w-full transition-all duration-200 ${
              selectedCoin === symbol ? "ring-2 ring-blue-500 rounded-xl" : ""
            }`}
          >
            <CryptoCard symbol={symbol} />
          </button>
        ))}
      </div>
      <SearchBar
        onSelectSymbol={(syselectedCoinmbol) =>
          setSelectedCoin(syselectedCoinmbol)
        }
      />
      <CryptoChart symbol={selectedCoin} />
    </div>
  );
};
