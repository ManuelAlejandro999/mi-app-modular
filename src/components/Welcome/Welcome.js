import React from "react";
const Welcome = ({nombre}) => {
    let mensaje;
    if (nombre === "Desarrollador") {
        mensaje = "¡Eres un crack!";
    } else {
        mensaje = "Este es un ejemplo de un componente modularizado";
    }
    return (
        <div>
            <h2>Bienvenido, {nombre}!</h2>
            <p>{mensaje}</p>
        </div>
    );
};
export default Welcome;