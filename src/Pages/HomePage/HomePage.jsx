import React from 'react'
import Banner from '../../Components/Banner/Banner'
import CoinTable from "../../Components/CoinTable/CoinTable"
import TrendingBox from '../../Components/TrendingBox/TrendingBox'
import TopPools from '../../Components/TopPools/TopPools'
const HomePage = () => {
  return (
    <div> 
      <Banner />
      <TrendingBox />
      <CoinTable />
      
    </div>
   
  )
}

export default HomePage