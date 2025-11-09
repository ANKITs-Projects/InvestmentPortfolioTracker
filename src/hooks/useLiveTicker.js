import { useEffect, useState, useRef } from "react";

export function useLiveTicker(symbol) {
  const [livePrice, setLivePrice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
const wsRef = useRef(null);


  

  useEffect(() => {
    if (!symbol) return;
    const pair = symbol.toLowerCase().endsWith("usdt") ? symbol.toLowerCase() : `${symbol.toLowerCase()}usdt`;
    const url = `wss://stream.binance.com:9443/ws/${pair}@trade`;

    // close old socket if open
    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(url);
    wsRef.current = ws;



    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.p) setLivePrice(parseFloat(msg.p));
    };
    ws.onclose = () => setIsConnected(false);

    return () => {
        wsRef.current.close()
      
    };
  }, [symbol]);

  return { livePrice, isConnected };
}
