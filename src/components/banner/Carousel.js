import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    
    backgroundColor:"black",
    height:"300",

  },
  carouselItem: {
    
    display: "flex",
    // paddingBottom:"20",
    flexDirection: "column",
    margin:"100",
    alignItems: "center",
    justifyContent:"center",
    // margin:"auto",
    textAlign:"center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "black",

  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency,symbol  } = CryptoState();
  const classes = useStyles();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency),{mode: "cors"});
    setTrending(data);
  };
  // console.log(trending);
  useEffect(()=>{

    fetchTrendingCoins();
  },[currency])

  const items = trending.map((coin) => {
    
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{color:"gold" , display:"flex" , flexDirection:"column",alignItems:"center" , textAlign:"center" , }}>
        &nbsp;{coin?.symbol }
          
          &nbsp; 
          <span
            style={{
              color: profit >0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        {/* &nbsp;  */}
        <span style={{ fontSize: 15, fontWeight: 500 , color:"gold"}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
