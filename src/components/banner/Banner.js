import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner:{
        // backgroundImage: "url(./banner1.jpg)" ,
        backgroundColor:"black",
        width:"100%",
    },
    bannerContent:{
        height:300,
        display:"flex",
        flexDirection:"column",
        paddingTop: 20,
        justifyContent:"space-between",
        width:"100%",
    },
    tagline: {
        display: "flex",
        height: "50%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        // color:"black",
      },
}));

const Banner = () => {
const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              // marginTop:100,
              fontFamily: "Montserrat",
              color:"white",
            }}
          >
            KoinMart
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "white",
              fontWeight:"600",
              // marginTop:20,
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>

        </div>
        <Carousel />
        </Container>
    </div>
  )
}

export default Banner