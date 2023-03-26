import React from 'react';
import './App.css';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import Contact_us from './Components/Pages/Contact_us/Contact_us';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';

function App() {
  return (
    <div className="App">
   <Header/>
    <Menu/>
    <Main/>
    <Footer/>
    </div>
  );
}

export default App;
