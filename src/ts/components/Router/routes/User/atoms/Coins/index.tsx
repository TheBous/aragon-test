import React, { FC, useEffect, useState } from "react";

const Coins: FC = () => {
  const [coins, setCoins] = useState<any[]>([]);

  const API_KEY = "dd22052d-be40-4914-b956-49bb9f17da1d";
  const listingEndpoint = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=${API_KEY}`;
  const antEndpoint = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ANT&convert=USD&CMC_PRO_API_KEY=${API_KEY}`;
  useEffect(() => {
    const fetchCoins = () => {
      Promise.all([listingEndpoint, antEndpoint].map((u) => fetch(u)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((jsons) => {
          const [coinsRes, antRes] = jsons;
          console.error(coinsRes, antRes);
          const finalRes = coinsRes.data.concat(Object.values(antRes.data));
          setCoins(finalRes);
        });
    };

    fetchCoins();
    const coinInterval = setInterval(() => {
      fetchCoins();
    }, 10000);

    return () => {
      clearInterval(coinInterval);
    };
  }, []);

  return (
    <div>
      <ul>
        {coins.map(
          ({
            symbol,
            quote: {
              USD: { price },
            },
          }) => {
            return (
              <li key={symbol}>
                <h4>{`${symbol}-${price?.toFixed(2)} USD`}</h4>
              </li>
            );
          }
        )}
      </ul>
      <p></p>
    </div>
  );
};

export default Coins;
