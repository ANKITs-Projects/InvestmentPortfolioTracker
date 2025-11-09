import { useState, useEffect } from "react";
import axios from "axios";

export function useSearchSymbol(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const fetchSymbols = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
        const allSymbols = res.data.symbols || [];

        // Filter only USDT pairs and match by query
        const filtered = allSymbols
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") &&
              item.symbol.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 10); // limit results

        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSymbols, 300); // debounce 300ms
    return () => clearTimeout(timer);
  }, [query]);
  
  return { results, loading };
}
