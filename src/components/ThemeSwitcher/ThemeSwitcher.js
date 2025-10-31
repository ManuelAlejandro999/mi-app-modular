import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./ThemeSwitcher.css";
import IconMoon from "../icons/IconMoon";
import IconSun from "../icons/IconSun";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
         <button onClick={toggleTheme} className="theme-switcher-btn">
            {theme === 'light' ? <IconMoon /> : <IconSun />}
        </button>
    );
};

export default ThemeSwitcher;

