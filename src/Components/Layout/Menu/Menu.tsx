import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import { removeAdmins } from "../../../Redux/AdminAppState";
import { useEffect } from "react";
function Menu(): JSX.Element {
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.adminsReducer.admins.slice(-1)[0]) || {};// to listen to admin logging in and to display the right menu

    const logOffHandler=()=>{
       

store.dispatch(removeAdmins());
        navigate("/movies")
    }
    return (
   
        <div className="Menu">
 {admin.adminId? (
                <>
               
                    <Link to="/movies">Movies</Link>
                    <Link to="/addmovie">Add Movie</Link>
                    <Link to="/ordersList">Orders List</Link>
                    <Link to="/deletemovie">Delete Movie</Link>
                    {/* <Link to="/editmovie">Edit Movie</Link> */}
                    <button onClick={logOffHandler}>Log Off</button>
                </>
            ) : (
                <>

                    <Link to="/home">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/about">About</Link>
                    <Link to="/adminlogin">Admins</Link>
                </>
            )}

        </div>
    );
}

export default Menu;
