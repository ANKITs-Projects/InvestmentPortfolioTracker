import React, { useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFetchHistoricalData } from "../../hooks/useFetchHistoricalData";
import { useLiveTicker } from "../../hooks/useLiveTicker";
import { ChartTooltip } from "./ChartTooltip";

export function CryptoChart({ symbol, days = 30 }) {
  const {
    data: historicalData,
    isLoading: historyLoading,
    isError: historyError,
    error: historyErrorDetails,
  } = useFetchHistoricalData(symbol, "1d", days);

  const { livePrice, isConnected, error: wsError } = useLiveTicker(symbol);

  const chartData = useMemo(() => {
    if (!historicalData || !Array.isArray(historicalData)) return [];

    // Copy and sort (oldest → newest)
    const baseData = [...historicalData].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Only append "Live" point if data is ready AND live price differs slightly from last candle
    if (livePrice && baseData.length > 0) {
      const lastPrice = baseData[baseData.length - 1].price;
      const diff = Math.abs(livePrice - lastPrice);
      if (diff > 0.5) {
        // avoids constant small flickers
        baseData[baseData.length - 1] = {
          ...baseData[baseData.length - 1],
          price: livePrice,
          time: "Live",
        };
      }
    }

    return baseData;
  }, [historicalData, livePrice]);

  useEffect(() => {
  // scroll or reset view (optional visual fix)
  window.scrollTo(0, 0);
  
  // If you track livePrice locally (from props or state), reset it here:
  // setLivePrice(null);
}, [symbol]);

  if (historyLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
        <div className="animate-pulse text-white">Loading chart data...</div>
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-500">
        Error: {historyErrorDetails?.message || "Failed to load chart data"}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl text-white h-96">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{symbol} Price</h2>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-extrabold text-green-400">
            ${livePrice?.toFixed(2) || "---"}
          </p>
          {!isConnected && (
            <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-500 rounded">
              Reconnecting...
            </span>
          )}
        </div>
        {wsError && <p className="text-sm text-red-400 mt-1">{wsError}</p>}
      </div>

      <ResponsiveContainer width="100%" height="70%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#999" interval="preserveStartEnd" />
          <YAxis
            stroke="#999"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Error message section */}
      {wsError && (
        <div className="mt-4 p-2 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
          <p className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {wsError}
          </p>
        </div>
      )}
    </div>
  );
}
