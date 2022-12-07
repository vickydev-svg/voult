import React from 'react'
import axios from "axios"
import { TrendingCoins } from '../../Api/api'
import "./carousel.css"
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const [trending,setTrending] = useState([])
  const {currency,symbol} = CryptoState()
  const fetchTrendingCoins = async () =>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data);
  }
  console.log(trending)
  useEffect(()=>{
    fetchTrendingCoins()
  },[currency])
  
  const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h >=0;
    console.log(profit)
    return (
      <NavLink className="carouselItem" to = {`/coins/${coin.id}`}>
      <img src={coin?.image} alt={coin?.name} style={{height:80,marginBottom:10}} />
      <span className="coinSymbol">
        {coin?.symbol}
        &nbsp;
        <span className="profit" style={{color: profit > 0 ? "rgb(14,203,129":"red"}}>
          {profit && "+" }{coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </span>
      <span className="price">
        {symbol} &nbsp; {numberWithCommas(coin?.current_price.toFixed(2))}
      </span>
      </NavLink>
    )
  })
  const responsive = {
    0:{
      items:2,
    },
    512:{
      items:4
    },
  }
  return (
    <div className='carousel'>
     <AliceCarousel 
     mouseTracking
     infinite
     autoPlayInterval={1000}
     animationDuration={1500}
     disableDotsControls
     disableButtonsControls
     responsive={responsive}
     items={items}
     autoPlay
     
     />
    </div>
  )
}
export default Carousel