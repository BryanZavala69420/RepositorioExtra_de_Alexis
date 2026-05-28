import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const Navegar = useNavigate();

    return (

        <div>

            <h1>Login</h1>

            <Formik

                initialValues={{

                    correo: '',
                    contraseña: ''

                }}

                onSubmit={(values) => {

                    axios.post(
                        'http://localhost:8081/acceder',
                        values
                    )

                        .then((res) => {

                            console.log(res.data);

                            if (res.data.status === "ok") {

                                localStorage.setItem(
                                    "sesionIniciada",
                                    "true"
                                );

                                localStorage.setItem(
                                    "usuarioNombre",
                                    res.data.usuario
                                );

                                localStorage.setItem(
                                    "usuarioRol",
                                    res.data.rol
                                );

                                localStorage.setItem(
                                    "usuarioId",
                                    res.data.id
                                );

                                if (res.data.perfil) {

                                    localStorage.setItem(
                                        "usuarioPerfil",
                                        res.data.perfil
                                    );

                                }


                                Navegar('/');

                            } else {

                                alert(res.data.mensaje);

                            }

                        })

                        .catch((err) => {

                            console.error(err);

                            alert("Error al iniciar sesión");

                        });

                }}

            >

                {({
                    handleSubmit,
                    handleChange,
                    values
                }) => (

                    <form onSubmit={handleSubmit}>
                        <div>


                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                onChange={handleChange}
                                value={values.correo}
                            />
                        </div>

                        <div>


                            <input
                                type="password"
                                name="contraseña"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                value={values.contraseña}
                            />
                        </div>
                        <button type="submit">
                            Ingresar
                        </button>

                    </form>

                )}

            </Formik>

        </div>

    );

}

export default Login;