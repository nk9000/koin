import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core';

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles(()=>({
  title: {
    flex: 1,
    color:'gold',
    fontFamily:'Montserrat',
    fontWeight:'bold' , 
    cursor:'pointer',
  }
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


const Header = () => {
  const classes = useStyles();//material ui
  const navigate = useNavigate();

  const {currency , setCurrency} = CryptoState();
  // console.log(currency);
  
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static' >
      <Container>
        <Toolbar>
          <Typography className={classes.title} variant='h6' onClick ={()=>navigate('/')}  >KoinMart</Typography>
          <Select variant='outlined' 
          style={{
            width:100,height:40, marginRight:15,
          }}
          value={currency} onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header;