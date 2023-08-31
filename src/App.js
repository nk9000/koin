import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';


function App() {
// const classes = useStyles();



  return (
    
    <BrowserRouter>
    <div className='App'  >
    
    <Header />
    <Routes>
    
    <Route path='/' Component={Homepage} exact />
    <Route path='/coins/:id' Component={CoinPage} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
