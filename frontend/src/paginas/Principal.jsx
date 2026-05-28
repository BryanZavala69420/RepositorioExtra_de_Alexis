import React from "react";
import { useNavigate } from "react-router-dom";

function Principal() {

    const Navegar = useNavigate();

    const nombreUsuario = localStorage.getItem(
        "usuarioNombre"
    );

    const cerrarSesion = () => {

        localStorage.removeItem("sesionIniciada");

        localStorage.removeItem("usuarioNombre");

        localStorage.removeItem("usuarioRol");

        localStorage.removeItem("usuarioId");

        localStorage.removeItem("usuarioPerfil");

        Navegar('/');

    };

    return (

        <div className="Principal-Principal">

            <h1>
                Hola {nombreUsuario || "Invitado"}
            </h1>

            <button onClick={cerrarSesion}>
                Cerrar sesión
            </button>

        </div>

    );

}

export default Principal;