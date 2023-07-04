import { useState } from "react";
import "./ToggleTheme.css";
import { Theme } from "../../../Models/Themes";
import store from "../../../Redux/Store";
import { toggleTheme } from "../../../Redux/ThemeAppState";
import { FaMoon, FaSun,  } from "react-icons/fa";

function ToggleTheme(): JSX.Element {
    const [theme, setTheme] = useState<Theme>(store.getState().themeReducer.theme);
    const changeTheme = () => {
        const defaultTheme = theme==='light-mode'?'dark-mode': 'light-mode';
        setTheme(defaultTheme);

    store.dispatch(toggleTheme(defaultTheme));
    }
    return (
        <div className="ToggleTheme">
<button onClick={changeTheme}>{theme === 'light-mode' ? <FaMoon /> : <FaSun />}</button>
			
        </div>
    );
}

export default ToggleTheme;
