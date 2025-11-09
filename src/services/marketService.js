const fetchData = async (symbol) => {
  const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=PGF7EFNWSODG1H1K`);
  const data = await res.json();
  return data["Global Quote"];
};
