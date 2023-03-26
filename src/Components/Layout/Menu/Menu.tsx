import { Link } from "react-router-dom";
import "./Menu.css";
function Menu(): JSX.Element {
    return (
        <div className="Menu">
		<Link to ="/home">Home</Link>	
        <Link to ="/login">Login</Link>	
        <Link to ="/register">Register</Link>	
        <Link to ="/contact_us">Contact_u</Link>
        <Link to ="about">About</Link>
        <Link to ="map">Map</Link>
        

        </div>
    );
}

export default Menu;
