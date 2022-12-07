import React from 'react'
import "./banner.css"
import { Container, fontWeight } from '@mui/system';
import { Typography } from '@mui/material';
import Carousel from './Carousel';
import BannerImage from "../../Images/pictureCenter.svg"
const Banner = () => {
  return (
    <div className='banner'>
      <Container className="bannerContent">
        <div className='tagline'>
         <img src={BannerImage } alt="" style={{height:"110%",width:"104%"}} />
         <Typography variant='subtitle2' style={{color:"#005373",textTransform:"capitalize",fontFamily:"Montserrat"}}>
             Get All The info regarding your favourite cryptocurrency
         </Typography>
         
        </div>
       < Carousel />
      </Container>
    </div>
  )
}

export default Banner