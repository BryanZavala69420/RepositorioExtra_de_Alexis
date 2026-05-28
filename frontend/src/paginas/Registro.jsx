import React from "react";
import { Formik } from "formik";
import axios from "axios";

function Registrar() {

    return (
        <div>

            <div className="titulo">
                <h1>Pagina de registro</h1>
            </div>

            <Formik

                initialValues={{
                    nombre: '',
                    apellidos: '',
                    correo: '',
                    contraseña: '',
                    institucion: '',
                    fecha: ''
                }}

                onSubmit={(values) => {

                    axios.post('http://localhost:8081/registrar', values)

                        .then((respuesta) => {

                            console.log(respuesta.data);

                            alert("Usuario registrado");

                        })

                        .catch((error) => {

                            console.error(error);

                            alert("Error al registrar");

                        });

                }}

            >

                {({ handleSubmit, handleChange, values }) => (

                    <form onSubmit={handleSubmit}>

                        <div className="formulario-registro">

                            <div className="nombre">

                                <label>Nombre</label>

                                <input
                                    type="text"
                                    name="nombre"
                                    onChange={handleChange}
                                    value={values.nombre}
                                />

                            </div>

                            <div className="apellido">

                                <label>Apellidos</label>

                                <input
                                    type="text"
                                    name="apellidos"
                                    onChange={handleChange}
                                    value={values.apellidos}
                                />

                            </div>

                            <div className="correo">

                                <label>Correo</label>

                                <input
                                    type="email"
                                    name="correo"
                                    onChange={handleChange}
                                    value={values.correo}
                                />

                            </div>

                            <div className="contraseña">

                                <label>Contraseña</label>

                                <input
                                    type="password"
                                    name="contraseña"
                                    onChange={handleChange}
                                    value={values.contraseña}
                                />

                            </div>

                            <div className="fecha">

                                <label>Fecha de nacimiento</label>

                                <input
                                    type="date"
                                    name="fecha"
                                    onChange={handleChange}
                                    value={values.fecha}
                                />

                            </div>

                            <div className="institucion">

                                <label>Institución</label>

                                <select
                                    name="institucion"
                                    onChange={handleChange}
                                    value={values.institucion}
                                >

                                    <option value="">
                                        Selecciona una institución
                                    </option>

                                    <option value="UAS">UAS</option>

                                    <option value="TEC_CULIACAN">
                                        Tecnológico de Culiacán
                                    </option>

                                    <option value="UADEO">UADEO</option>

                                    <option value="UNAM">UNAM</option>

                                </select>

                            </div>

                            <div className="boton">
                                <button type="submit">
                                    Enviar
                                </button>
                            </div>

                        </div>

                    </form>

                )}

            </Formik>

        </div>
    );
}

export default Registrar;