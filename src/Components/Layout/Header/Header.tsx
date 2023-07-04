import { useSelector } from "react-redux";
import ToggleTheme from "../../Shared/ToggleTheme/ToggleTheme";
import "./Header.css";
import { RootState } from "../../../Redux/Store";

function Header(): JSX.Element {
    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};
    return (
        <div className="Header">
{user.firstName&&<h3>Welcome {user.firstName}! </h3>}
			<h1>Welcome  to  Cinema Lavi</h1>
            <div className="ToggleThemeWrapper">
                <ToggleTheme />
            </div>
        </div>
    );
}

export default Header;
