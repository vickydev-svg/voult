import React, { useState } from 'react'
import "./coinInfo.css"
import { Doughnut } from 'react-chartjs-2';
import { CryptoState } from '../../CryptoContext';
import { HistoricalChart } from '../../Api/api';
import axios from 'axios';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import {Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { chartDays } from '../../Data/data';
import CustomButtons from '../Buttons/CustomButtons';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CoinList } from '../../Api/api';
import { ChangingVolume } from '../../Api/api';
const darkTheme = createTheme({
   
    palette: {
      primary:{
        main:"#fff"
      },
      mode:"dark"
    },
  });

const CoinInfo = ({coin}) => {
    
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const [volume,setVolume] = useState([])
    const {currency} = CryptoState()

    const fetchHistoricData= async () =>{
      
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
      
       
        console.log(data)
        setHistoricalData(data.prices);
        
        
    }

    const volumeChange = async () =>{
      const {data} = await axios.get(ChangingVolume(coin.id,currency));
      console.log(data)
      setVolume(data);
      console.log(volume)
    };
    console.log(volume)

   console.log(volume.inr)
   console.log(historicalData)
   console.log(coin)
    useEffect(()=>{
        fetchHistoricData();
      
    },[currency,days])
    useEffect(()=>{
      volumeChange();
  },[currency])
  return (
    <div className="chart_container">
        {
            !historicalData ? (
<CircularProgress
style={{color:"rgb(255, 99, 132)"}}
size={250}
thickness={1}

/>
            ):(
                <ThemeProvider theme={darkTheme}>
                <>
                <Line 
                color=''
                data={{
                    labels:historicalData?.map((coin) =>{
                        let date = new Date(coin[0]);
                        let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets:[
                        {data:historicalData.map((coin)=>coin[1],
                          
                         
                          
                          ), 
                         borderColor: '#005373',
                        backgroundColor: '#005373',
                        label:`Price (Past ${days} Days) in ${currency}`
                    }
                    ]
                }}
                />
                <div style={{display:"flex",marginTop:20,justifyContent:"space-around",width:"100%"}}>
                    {chartDays.map((day) => (
                     <CustomButtons  key = {day.value} onClick = {()=>setDays(day.value)}style={{backgroundColor:"black"}} selected={day.value===days}>{day.label}</CustomButtons>
                            
                   
                    ))}
                </div>
                </>
                </ThemeProvider>
            )
        }
    </div>
  )
}

export default CoinInfo