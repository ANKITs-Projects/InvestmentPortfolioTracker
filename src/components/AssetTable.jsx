import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { db, auth } from "../firebase/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteAsset, getUserAssets } from "../firebase/firestore";
import { UpdateAssets } from "./UpdateAssets";
import { useAuth } from "../context/AuthContext";

export const AssetTable = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [assitId, setAssetId] = useState(null);

  const {userAssets, loading, refreshUserData} = useAuth()



  if (loading)
    return <p className="text-gray-400 text-center">Loading userAssets...</p>;

  return (
    <div className="mt-10 bg-gray-900 rounded-xl p-6 shadow-lg text-white overflow-x-auto relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Portfolio</h2>

      {userAssets.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-3 ">Symbol</th>
              <th className="p-3 ">Type</th>
              <th className="p-3 ">Qty</th>
              <th className="p-3 ">Buy Price</th>
              <th className="p-3 ">Current Price</th>
              <th className="p-3 ">Current Value</th>
              <th className="p-3 ">P/L</th>
              <th className="p-3 text-center">Edit/Delet</th>
            </tr>
          </thead>
          <tbody>
            {userAssets.map((a) => (
              <tr
                key={a.id}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
              >
                <td className="p-3 font-semibold">{a.symbol}</td>
                <td className="p-3 capitalize text-gray-300">{a.type}</td>
                <td className="p-3">{a.qty}</td>
                <td className="p-3">${a.buyPrice.toLocaleString()}</td>
                <td className="p-3">${a.currentPrice?.toLocaleString()}</td>
                <td className="p-3">${a.currentValue?.toLocaleString()}</td>
                <td
                  className={`p-3 font-semibold ${
                    a.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {a.profitLoss >= 0 ? "+" : ""}
                  {a.profitLoss !== undefined && a.profitLoss !== null
                    ? a.profitLoss
                    : "N/A"}{" "}
                  ({a.profitPercent}%)
                </td>
                <td className="p-3 flex justify-center gap-1 ">
                  <FaRegEdit
                  className=" hover:text-blue-700  size-5 cursor-pointer"
                    onClick={() => {
                      setIsEditOpen(true);
                      setAssetId(a.id);
                    }}
                  />
                  <MdDelete 
                  className=" hover:text-blue-700  size-5 cursor-pointer"
                  onClick={()=>{
                    deleteAsset(a.id)
                    refreshUserData()
                  }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          You haven’t added any userAssets yet.{" "}
          <Link
            to="/addassets"
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Add one now.
          </Link>
        </p>
      )}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <UpdateAssets onClose={() => setIsEditOpen(false)} id={assitId} />
  </div>
      )}
    </div>
  );
};
