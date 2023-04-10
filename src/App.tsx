import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import Main from './Components/Layout/Main/Main';
import Menu from './Components/Layout/Menu/Menu';
import Contact_us from './Components/Pages/Contact_us/Contact_us';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import { Theme } from './Models/Themes';
import  store , { RootState } from './Redux/Store';
import { useSelector} from 'react-redux'

function App() {
  const theme =useSelector((store:RootState) => store.themeReducer.theme);
  // const [theme, setTheme] = useState<Theme>('light-mode')
  // const changeTheme=()=>{
  //   if(theme==='light-mode')
  //   {setTheme('dark-mode')}
  // else{setTheme('light-mode')}  }
  return (
    <div className={`App ${theme}`}>
    {/* <button onClick={changeTheme}>{(theme==='light-mode'? 'go dark':'go light')}</button> */}
   <Header/>
    <Menu/>
    <Main/>
    <Footer/>
    </div>
  );
}

export default App;
