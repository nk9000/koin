import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { CoinList } from "../config/api";
import "./input.css";

import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
// import { numberWithCommas } from "./banner/Carousel";



const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1)

  let navigate = useNavigate();
  // const classes = useStyles();

  const tableHeaderStyle = {
    backgroundColor: 'gold',
  
    color: '#333',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'left', // Align table headers to the left
    fontSize: '1.1rem',
    marginTop: '1rem',
    width:"100%",
  };
  
  const tableCellStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'left', // Align table cells to the left
    fontSize: '0.9rem',
    width:"100%",
  };
  


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency), { mode: "cors" });
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const Search = coins.filter((coinofi)=>{
    return coinofi.name.toLowerCase().includes(search.toLowerCase());
  })
//  console.log(search);

  return (
    <div className="main">
      <div className="first" style={{display:"flex" , flexDirection:"column",}}>
        <input placeholder="Search--Powered by Nilesh"   className="cool-input" onChange={(e) => setSearch(e.target.value)}/>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} >
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Coin</th>
          <th style={tableHeaderStyle}>Image</th>
          <th style={tableHeaderStyle}>Price</th>
          <th style={tableHeaderStyle}>Δ</th>
        </tr>
      </thead>
      <tbody>
        {Search
        .slice((page-1)*10 , (page-1) * 10 + 10 )
        .map((item) => (
          
          <tr key={item.id} onClick={()=>navigate(`/coins/${item.id}`) } style={{cursor:"pointer" , }}  >
            {/* let profit = item?.price_change_percentage_24h ; */}
            <td style={tableCellStyle} >{item.name}</td>
            <td style={tableCellStyle} ><img
                            src={item?.image}
                            
                            height="50"
                            style={{ marginBottom: 10,color:"white", }}
                          /></td>
            <td style={tableCellStyle } >{symbol}{item.current_price }</td>
            
            <td style={tableCellStyle}  >{item.price_change_percentage_24h}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination  style={{backgroundColor:"gold" , padding:10 , width:"100%" , display:"flex" , justifyContent:"center" }}
    count={( Search?.length/10 ).toFixed(0)}
    onChange={(_,value) => {
      setPage(value);
      window.scroll(0,450);
    }}
    
    />

  
      </div>
    </div>
  );
};

export default CoinsTable;
