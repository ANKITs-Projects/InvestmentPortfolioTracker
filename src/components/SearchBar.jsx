import React, { useState } from "react";
import { useSearchSymbol } from "../hooks/useSearchSymbol";

export function SearchBar({ onSelectSymbol }) {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearchSymbol(query);

  const handleSelect = (symbol) => {
    onSelectSymbol(symbol);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md mb-6">
      <h3 className="font-bold text-xl text-neutral-700 mb-6 ">
          Search Crypto
        </h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search crypto (e.g. BTC, ETH)..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
      />

      {loading && (
        <div className="absolute right-3 top-3 text-gray-400 text-sm animate-pulse">
          Loading...
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute mt-2 w-full bg-gray-900 rounded-lg border border-gray-700 max-h-56 overflow-y-auto z-50">
          {results.map((coin) => (
            <li
              key={coin.symbol}
              onClick={() => handleSelect(coin.symbol)}
              className="p-3 hover:bg-gray-800 cursor-pointer text-gray-200"
            >
              {coin.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
