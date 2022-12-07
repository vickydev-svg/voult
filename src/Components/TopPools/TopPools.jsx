import React from 'react'
import { useState } from 'react'
import {Pools} from "../../Api/api"
import axios from 'axios'
import { useEffect } from 'react'
import { Container, LinearProgress, Pagination, TableContainer, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import { ChangingPrice } from '../../Api/api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MoreTokens } from '../../Api/api'
const TopPools = () => {
    const [loading,setLoading]=useState()
    const [pools,setPools] = useState()
    const [morePools,setMorePools] = useState();
    const moreToken = async () =>{
        const {data} = await axios.get(MoreTokens())
        console.log()
        setMorePools(data);
    }
    const fetchPool = async () =>{
        setLoading(true)
        const {data} = await axios.get(Pools());
        console.log(data)
         setPools(data);
        setLoading(false);
        
    }
    console.log(pools)
    console.log(pools?.data)
    
    console.log(morePools?.pools);
   
    useEffect(()=>{
        fetchPool();
        
    },[]);
    useEffect(()=>{
        moreToken();
    },[]);
   
    
    
    
   
  return (
    <Container style={{textAlign:"center"}}>
        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{backgroundColor:"gold"}}/>
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor:"#005373"}}>
                           <TableRow>
                           {["Name","Volume24h","TVL"].map((head)=>(
                            <TableCell style={{color:"white",fontWeight:"700",fontFamily:"Montserrat",width:"40%"}} key={head} >
                              <div className="head">{head}</div>
                            </TableCell>
                        ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                            {morePools?.pools?.map((pool)=>{
                                return (
                                    <TableRow className='row' key={pool.name} style={{cursor:"pointer",marginBottom:"20 !important"}}>
                                         <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                                
                                <div
                            style={{ display: "flex",alignItems:"center"}}
                          ><img src={`https://api.pecunovus.net/hootdex/images/${pool?.img}`} alt={pool?.wrapTokenI_img} height="20" style={{marginBottom:10}} />
                          <img src={pool?.wrapToken_img} alt={pool?.wrapTokenI_img} height="20" style={{marginBottom:10}} />
                          <span className="token_name" style={{marginLeft:"10px"}}>{pool.project_name}</span>
                          <span className="token_short" style={{color:"darkGrey"}}>{`(${pool.project_token_symbol}/${pool.wrap_token_symbol}/PECU)`}</span>
                          </div>
                         
                              </TableCell>
                              <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                                <span>0.00</span>
                                <div
                            style={{ display: "flex", flexDirection: "column"}}
                          >
                          </div>
                          {/*  */}
                              </TableCell>
                              <TableCell component='th' scope="row" styles={{display:"flex",flexDirection:"column",justifyContent:"center",width:"5%"}} >
                                <span>0.00</span>
                                <div
                            style={{ display: "flex", flexDirection: "column"}}
                          >
                          </div>
                          {/*  */}
                              </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>

    </Container>
  )
}

export default TopPools