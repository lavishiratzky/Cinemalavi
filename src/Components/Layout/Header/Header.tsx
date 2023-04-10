import ToggleTheme from "../../Shared/ToggleTheme/ToggleTheme";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

			<h1>This is my App</h1>
            <ToggleTheme/>
        </div>
    );
}

export default Header;
