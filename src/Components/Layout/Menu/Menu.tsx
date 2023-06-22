import { Link } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
function Menu(): JSX.Element {
    const admin = useSelector((state: RootState) => state.adminsReducer.admins.slice(-1)[0]) || {};
    return (
   
        <div className="Menu">
            {/* {admin.adminId} ?(
         <Link to ="/addmovie">Login</Link>	
         <Link to ="/ordersList">Orders List</Link>
            ):( */}
		<Link to ="/home">Home</Link>	
        <Link to ="/login">Login</Link>	
        <Link to ="/register">Register</Link>	
        <Link to ="/about">About</Link> 
        <Link to ="/map">General Info. </Link>
        <Link to ="/adminlogin">Admins</Link>
            {/* ) */}
        {/* <Link to ="AddMovie">AddMovie</Link>
        <Link to ="movies">Movies</Link>
        <Link to ="ordersList">Orders List</Link>
        <Link to ="order">Order</Link> */}
        

        </div>
    );
}

export default Menu;
