import React from "react";
import { Link } from 'react-router-dom';
import "./Header.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="app-header">
      <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo de la Aplicación" className="app-logo" />
      <div className="logo-nav">
        <h1 className="logo">Mi App</h1>
        <nav>
          {/* Usamos <Link> en lugar de <a href=""> */}
          <Link to="/">Inicio</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/directorio">Directorio</Link>
          <Link to="/*">*</Link>
        </nav>
      </div>
        
        <ThemeSwitcher className="theme-switcher-right" />
    </header>
);
};

export default Header;
