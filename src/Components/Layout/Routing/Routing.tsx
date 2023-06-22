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
import AddMovie from "../../Pages/AddMovie/AddMovie";
import OrdersList from "../../Pages/OrdersList/OrdersList";
import Order from "../../Pages/Order/Order";
import Success from "../../Pages/Success/Success";
import AdminLogin from "../../Pages/AdminLogin/AdminLogin";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<App/>}/>
                <Route path="home" element={<Movies/>}/>
                <Route index element ={<Movies/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="addMovie" element={<AddMovie/>}/>
                <Route path="movies" element={<Movies/>}/>
                <Route path="ordersList" element={<OrdersList/>}/>
                <Route path="order" element={<Order/>}/>
                <Route path="Success" element={<Success/>}/>
                <Route path="map" element={<Map/>}/>
                <Route path="adminlogin" element={<AdminLogin/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
