import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateAssets } from "../firebase/firestore";
import { useSearchSymbol } from "../hooks/useSearchSymbol";
import { RxCross2 } from "react-icons/rx";

export const UpdateAssets = ({ onClose, id }) => {
  const [symbol, setSymbol] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [type, setType] = useState("");
  const [qty, setQty] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [error, setError] = useState(null);

  const { user, userData, refreshUserData } = useAuth();
  const asset = userData?.assets?.find((e) => e.id === id);
  const { results, loading } = useSearchSymbol(symbol);

  useEffect(() => {
    if (!asset) return;
    setSelectedSymbol(asset.symbol || "");
    setType(asset.type || "");
    setQty(asset.qty || "");
    setBuyPrice(asset.buyPrice || "");
  }, [asset]);

  const handleSelect = (coinSymbol) => {
    setSelectedSymbol(coinSymbol);
    setSymbol("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSymbol || !qty || !buyPrice || !type) {
      setError("Please fill all fields.");
      return;
    }

    try {
      await updateAssets(user.uid,{
        id,
        symbol: selectedSymbol,
        qty,
        buyPrice,
        type,
      });
      await refreshUserData();
      refreshUserData()
      onClose(); 
    } catch (err) {
      setError("Failed to save asset. Please try again.");
    }
  };

  return (
    <div className="flex relative justify-center items-center w-md bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Asset</h1>

        {/* Symbol Input */}
        <div className="mb-4 relative">
          <input
            id="Symbol"
            type="text"
            placeholder="Enter Symbol Name"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading && <p className="text-gray-500 mt-2">Loading...</p>}

          {results.length > 0 && (
            <ul className="absolute z-10  bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto">
              {results.map((coin) => (
                <li
                  key={coin.symbol}
                  onClick={() => handleSelect(coin.symbol)}
                  className="p-2  hover:bg-blue-100 cursor-pointer"
                >
                  {coin.symbol}
                </li>
              ))}
            </ul>
          )}
          {selectedSymbol && (
            <p className="text-sm text-green-600 mt-1">
              Selected: <strong>{selectedSymbol}</strong>
            </p>
          )}
        </div>

        {/* Asset Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Asset Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <input
            type="number"
            min="0"
            step="any"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full border rounded py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buy Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Buy Price</label>
          <input
            type="number"
            min="0"
            step="any"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full border rounded py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Asset
        </button>

        <div className="absolute top-2 right-3 text-gray-600 hover:text-black cursor-pointer">
          <RxCross2 onClick={onClose} />
        </div>
      </form>
    </div>
  );
};
