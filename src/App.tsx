import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import  { RootState } from './Redux/Store';
import { useSelector} from 'react-redux'

function App() {
  const theme =useSelector((store:RootState) => store.themeReducer.theme);
  return (
    <div className={`App ${theme}`}>
   <Header/>
    <Menu/>
    <Main/>
    <Footer/>
    </div>
  );
}

export default App;
