import { Container } from '@mui/system'
import axios from 'axios'
import React from 'react'
import "./trendingBox.css"
import { TrendingCoins } from '../../Api/api'
import { CryptoState } from '../../CryptoContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const TrendingBox = () => {
    const [trend,setTrend] = useState([])
  const {currency,symbol} = CryptoState()
  const fetchTrending = async () =>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrend(data);
  }
  console.log(trend)
  useEffect(()=>{
    fetchTrending()
  },[currency])
  return (
   <Container className="trendingBox">
    <div className="trendingBox1 common_box">
    <span className="trending_title" >
                Trending 
            </span>
        <div className="trending" >
          
            {trend.map((coin)=>{
                let profit = coin.price_change_percentage_24h >=0;
                console.log(profit)
                return   <NavLink className="trendingBoxItem" to = {`/coins/${coin.id}`}>
                <div className="trending_links">
                <div className="image_index" style={{display:"flex",justifyContent:"center"}}>
                <img src={coin?.image} alt={coin?.name} style={{height:20,marginBottom:10,marginRight:"10px"}} />
                <span className="coinSymbol">
                  {coin?.symbol}
                </span>
                </div>
                  <span className="trending_profit" style={{color: profit > 0 ? "rgb(14,203,129":"red"}}>
                    {profit && "+" }{coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                  </div>
                </NavLink>
               
                
                
            })}

        </div>
    </div>
    <div className="trendingBox1 common_box">
    <span className="trending_title" >
               Recently Added
            </span>
        <div className="trending" >
          
            {trend.map((coin)=>{
                let profit = coin.price_change_percentage_24h >=0;
                console.log(profit)
                return   <NavLink className="trendingBoxItem" to = {`/coins/${coin.id}`}>
                <div className="trending_links">
                <div className="image_index" style={{display:"flex",justifyContent:"center"}}>
                <img src={coin?.image} alt={coin?.name} style={{height:20,marginBottom:10,marginRight:"10px"}} />
                <span className="coinSymbol">
                  {coin?.symbol}
                </span>
                </div>
                  <span className="trending_profit" style={{color: profit > 0 ? "rgb(14,203,129":"red"}}>
                    {profit && "+" }{coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                  </div>
                </NavLink>
               
                
                
            })}

        </div>
    </div>
    {/* <div className="trendingBox1 common_box">
       
    </div> */}

   </Container>
  )
}

export default TrendingBox