import React from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../../CryptoContext';
import { useState } from 'react';
import {SingleCoin} from "../../Api/api"
import axios from "axios"
import { useEffect } from 'react';
import CoinInfo from '../../Components/CoinInfo/CoinInfo';
import {  MenuItem, Select, Toolbar, Typography } from '@mui/material';
import {LinearProgress} from '@mui/material'
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
  
  const {id}  = useParams();
 const [coin,setCoin] = useState();
 const {currency,symbol}= CryptoState()
  const fetchCoin =  async () => {
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data);
  }
 console.log(coin)
 useEffect(()=>{
     fetchCoin()
 },[])
 if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
   <div className="container">
    <div className="sidebar" >
     <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:"20px"}} />
     <Typography variant='h3' className='heading'>
          {coin?.name}
     </Typography>
     <Typography variant='subtitle1' className='description' style={{color:"black",fontWeight:"light",width:"100%",fontFamily:"Montserrat",padding:25,paddingBottom:25}}>
          {coin?.description.en.split(". ")[0]}
     </Typography>

     <div className="market_data">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color:"black"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
    </div>

      <CoinInfo coin = {coin}/>
   
   </div>
  )
}

export default CoinPage