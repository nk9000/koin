import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { Typography, makeStyles } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import "./CoinPage.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); // Initialize coin state as null
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log("Error fetching coin:", error);
      setCoin(null); // Set coin state to null on error
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    // Display a loading state or message when coin data is being fetched
    return <div>Loading...</div>;
  }

  const sentence = coin?.description?.en.split(". ")[0];

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h4" className="heading">
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          className="description"
          dangerouslySetInnerHTML={{ __html: sentence }}
        />
        <div className="otherdetails">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading1">
              Rank: {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading1">
              Current Price: {symbol}{" "}
              {coin?.market_data?.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin}  />
    </div>
  );
};

export default CoinPage;
