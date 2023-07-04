import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import { removeAdmins } from "../../../Redux/AdminAppState";
import { removeUsers } from "../../../Redux/UsersAppState";
function Menu(): JSX.Element {
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.adminsReducer.admins.slice(-1)[0]) || {};// to listen to admin logging in and to display the right menu
    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};// to listen to admin logging in and to display the right menu
    const logOffHandler=()=>{
store.dispatch(removeAdmins())
store.dispatch(removeUsers());
        navigate("/movies")
    }
    return (
   
        <div className="Menu">
 {admin.adminId? (
                <>
               
                    <Link to="/movies">Edit a Movie</Link>
                    <Link to="/addmovie">Add a Movie</Link>
                    <Link to="/deletemovie">Delete a Movie</Link>
                    <Link to="/ordersList">Orders List</Link>
                    <button onClick={logOffHandler}>Log Off</button>
                </>
            ) : (
                <>

                    <Link to="/home">Home</Link>
                    {user.userId?<></>:<Link to="/login">Login</Link>}
                    <Link to="/register">Register</Link>
                    <Link to="/about">About</Link>
                    <Link to="/adminlogin">Admins</Link>
                    {user.userId&&<button onClick={logOffHandler}>Log Off</button>}
                </>
            )}

        </div>
    );
}

export default Menu;
