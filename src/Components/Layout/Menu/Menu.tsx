import { Link } from "react-router-dom";
import "./Menu.css";
function Menu(): JSX.Element {
    return (
        <div className="Menu">
		<Link to ="/home">Home</Link>	
        {/* <Link to ="/login">Login</Link>	
        <Link to ="/register">Register</Link>	
        <Link to ="/contact_us">Contact_us</Link>
        <Link to ="about">About</Link> */}
        <Link to ="AddMovie">AddMovie</Link>
        <Link to ="movies">Movies</Link>
        <Link to ="ordersList">Orders List</Link>
        <Link to ="order">Order</Link>
        

        </div>
    );
}

export default Menu;
