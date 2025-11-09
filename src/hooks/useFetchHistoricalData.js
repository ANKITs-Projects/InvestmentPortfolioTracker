import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchHistoricalData(symbol, interval = "1d", limit = 30) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const controller = new AbortController();
    const source = axios.CancelToken.source();
    const pair = symbol.toUpperCase().endsWith("USDT") ? symbol.toUpperCase() : `${symbol.toUpperCase()}USDT`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://api.binance.com/api/v3/klines", {
          params: { symbol: pair, interval, limit },
          cancelToken: source.token,
          signal: controller.signal,
        });

        const formatted = res.data.map((c) => ({
          time: new Date(c[0]).toLocaleDateString(),
          price: parseFloat(c[4]),
          timestamp: c[0],
        }));
        setData(formatted);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      source.cancel("Symbol changed — cancel previous request");
    };
  }, [symbol, interval, limit]);

  return { data, isLoading, error };
}
