import React from 'react'
import { useState } from 'react'
import "./coinTable.css"
import { CoinList } from '../../Api/api'
import { CryptoState } from '../../CryptoContext'
import axios from 'axios'
import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Pagination, TableContainer, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import { ChangingPrice } from '../../Api/api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { HistoricalChart } from '../../Api/api'
import CoinInfo from "../CoinInfo/CoinInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HootDex from '../Hootdex/HootDex'
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const removeDuplicatedToken = (allData) => {
    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
          allData[i].initialFinal =
            allData[j].initialFinal + allData[i].initialFinal;
          allData = allData.filter((e) => e !== allData[j]);
        }
      }
    }
  
    for (let i = 0; i < allData.length; i++) {
      for (let j = i + 1; j < allData.length; j++) {
        if (allData[i].symbol == allData[j].symbol) {
          return removeDuplicatedToken(allData);
        }
      }
    }
  
    return allData;
  };
const CoinTable = () => {
    const navigate = useNavigate()
    const {currency,symbol} = CryptoState()
    // const [changeCoin,setCoinChange] = useState([]);
    const [coins,setCoins] = useState([]);
    const [loading,setLoading]= useState(false);
    const [tokenlLoading,setTokenLoading] = useState(false)
    const [search,setSearch] = useState("");
    const [page,setPage]=useState(1);
    // new
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const [volume,setVolume] = useState([])
    const [coinToken,setCoinToken] =  useState([])

    const fetchCoins = async () =>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
        
    }

    const fetchHistoricData= async () =>{
      
      const {data} = await axios.get(HistoricalChart(coins.id,days,currency))
    
     
      console.log(data)
      setHistoricalData(data.prices);
      
      
  }
  
 console.log(historicalData)
    // const changeCoins = async () =>{
    //   const {data} = await axios.get(ChangingPrice(currency));
    //   setCoinChange(data);

    // }
    // console.log(changeCoin)
    console.log(coins)
    useEffect(()=>{
        fetchCoins();
        
    },[currency])
    useEffect(()=>{
      fetchHistoricData();
    })

    useEffect(() => {
      setTokenLoading(true);
      axios
        .get(`https://api.pecunovus.net/wallet/get_all_tokens_wrap`)
        .then((res) => {
          if (res.data.status) {
            setCoinToken(removeDuplicatedToken(res.data.tokens));
          }
          setTokenLoading(false);
        })
        .catch((err) => {
          setTokenLoading(false);
        });
      
    },[]);
    console.log(coinToken);
    const full = [...coins,...coinToken]
    console.log(full)
    const darkTheme = createTheme({

        palette: {
          primary:{
            main:"#fff"
          },
          mode:"dark"
        },
      });

      const handleSearch = () =>{
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ))
      }
  return (
    
       <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat",color:"#005373"}}>
             Cryptocurrencies Prices By Market Cap
            </Typography>
            <TextField label="Search For A Crypto Currency.." variant='outlined' style={{marginBottom:20,width:"100%"}} onChange={(e)=>setSearch(e.target.value)}/>
       <TableContainer>
        {
            loading ? (
                <LinearProgress style={{backgroundColor:"gold"}}/>
            ):(
                <Table>
                 <TableHead style={{backgroundColor:"#005373"}}>
                    <TableRow>
                        {["Coin","Price","1h%","24h%","Market Cap"].map((head)=>(
                            <TableCell style={{color:"white",fontWeight:"700",fontFamily:"Montserrat",width:"5%"}} key={head} >
                               {head}
                            </TableCell>
                        ))}
                    </TableRow>

                 </TableHead>
                 <TableBody>

                    {handleSearch().slice((page-1)*10,(page-1) * 10+10).map((row)=>{
                        const profit = row.price_change_percentage_24h > 0;
                        console.log()
                        return (
                            <TableRow
                        
                            onClick={()=>navigate(`/coins/${row.id}`)}
                            className="row"
                            key={row.name}
                            style={{cursor:"pointer",marginBottom:"20 !important"}}
                            >
                              <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                                <img src={row?.image} alt={row?.name} height="20" style={{marginBottom:10}} />
                                <div
                            style={{ display: "flex", flexDirection: "column"}}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"black"
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                          {/*  */}
                              </TableCell>
                              <TableCell align="right" style={{color:"black",width:"15%"}}>
                          <div className="price" style={{display:"flex"}}>
                          {symbol}{numberWithCommas(row.current_price.toFixed(2))}
                          </div>
                          
                        </TableCell>
                        {/*  */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            width:"10%"
                          }}
                        >
                          {/* {profit && "+"} */}
                           <div className="symbol_text">
                           <div className="picture" style={{width:"14%"}}>
                           {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                          </div>
                           <div className="price_content" style={{width:"83%"}}>
                           {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                           </div>
                           
                           </div>
                          
                        </TableCell>
                        {/*  */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            width:"10%"
                          }}
                        >

                          <div className="symbol_text" >
                          <div className="picture" style={{width:"14%"}}>
                          {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                          </div>
                           <div className="price_content" style={{width:"83%"}}>
                           {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                           </div>
                           
                           </div>
                          {/* {profit && "+"} */}
                          
                        </TableCell>
                        
                        {/* <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            width:"10%"
                          }}
                        >
                          
      
                          <div className="symbol_text" >
                          <div className="picture" style={{width:"14%"}}>
                          {profit ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"green"}}><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{color:"red"}}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>}
                          </div>
                           <div className="price_content" style={{width:"83%"}}>
                           {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                           </div>
                           </div>
                        </TableCell> */}
                      
                        <TableCell align="right" style={{color:"black",width:"10%"}}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        
                            </TableRow>
                        )
                    })}
                    
                   {page==1 ?  <HootDex/>:<></>}
                 </TableBody>
                </Table>
            )
        }
        
       </TableContainer>

       {/* <div className="table" style={{width:"100%",height:"10vh",backgroundColor:"black",}} >
        <div className="table_head" style={{display:"flex",justifyContent:"space-between",alignItems:"center",overflowX:"scroll"}}>
              {["Coin","Price","1h%","24h%","7d%","Market Cap","Coin","Price","1h%","24h%","7d%","Market Cap"].map((head)=>(
                            <div style={{color:"white",fontWeight:"700",fontFamily:"Montserrat",maxWidth:"20%"}} key={head} >
                               {head}
                            </div>
              ))}
                   
        </div>
       </div> */}

      <Pagination 
       count={(handleSearch()?.length/10).toFixed(0)}
       
       className="pagination"
       variant="outlined"
       color="secondary"
       onChange={(_,value)=>{
        setPage(value);
        window.scroll(0,450)
       }}
      />

       </Container>

    
  )
}

export default CoinTable