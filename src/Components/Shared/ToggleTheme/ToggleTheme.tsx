import { useState } from "react";
import "./ToggleTheme.css";
import { Theme } from "../../../Models/Themes";
import store from "../../../Redux/Store";
import { toggleTheme } from "../../../Redux/ThemeAppState";

function ToggleTheme(): JSX.Element {
    const [theme, setTheme] = useState<Theme>(store.getState().themeReducer.theme);
    const changeTheme = () => {
      if (theme === 'light-mode')
      {setTheme('dark-mode')}
    else{
        setTheme('light-mode')
    } 

    store.dispatch(toggleTheme(theme));
    }
    return (
        <div className="ToggleTheme">
            <button onClick={changeTheme}>{(theme ==='light-mode'? 'go light':'go dark')}</button>
			
        </div>
    );
}

export default ToggleTheme;
