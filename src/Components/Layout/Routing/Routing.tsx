import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../Pages/About/About";
import Contact_us from "../../Pages/Contact_us/Contact_us";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import Map from "../../Pages/Map/Map";
import "./Routing.css";
import Movies from "../../Pages/Movies/Movies";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<App/>}/>
                <Route path="home" element={<Home/>}/>
                <Route index element ={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="contact_us" element={<Contact_us/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="map" element={<Map/>}/>
                <Route path="movies" element={<Movies/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
