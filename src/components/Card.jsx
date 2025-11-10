import React from "react";

export const Card = ({ title, value, color }) => {
  return (
    <div className="p-6 min-w-[250px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex flex-col justify-between items-start gap-3">
        <div className="flex items-center space-x-2">
          <h2 className="font-bold text-xl text-gray-800">{title}</h2>
        </div>

        <div className="text-right">
          <p className={`text-2xl font-bold ${color}`}>
            {value.toLocaleString()}
          </p>    
        </div>
      </div>
    </div>
  );
};
