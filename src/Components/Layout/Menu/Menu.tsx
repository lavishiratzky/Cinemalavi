import { Link } from "react-router-dom";
import "./Menu.css";
function Menu(): JSX.Element {
    return (
        <div className="Menu">
		<Link to ="/home">Home</Link>	
        <Link to ="/login">Login</Link>	
        <Link to ="/register">Register</Link>	
        <Link to ="/contact_us">Contact us</Link>
        <Link to ="about">About</Link>
        <Link to ="AddMovie">Add Movie</Link>
        <Link to ="movies">Movies</Link>
        <Link to ="orderslist">Orders List</Link>
        

        </div>
    );
}

export default Menu;
