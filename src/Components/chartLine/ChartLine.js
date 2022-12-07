import React from 'react'
import {Line} from "react-chartjs-2"
    import Chart from 'chart.js/auto';
    import { chartDays } from '../../Data/data';
import CustomButtons from '../Buttons/CustomButtons';
import { HistoricalChart } from '../../Api/api';
import { CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { useState } from 'react';
const ChartLine = ({coin}) => {
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const [volume,setVolume] = useState([])
    const {currency} = CryptoState()

    const fetchHistoricData= async () =>{
      
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
      
       
        console.log(data)
        setHistoricalData(data.prices);
        
        
    }

  return (
    <div>
        chart line
    </div>
  )
}

export default ChartLine