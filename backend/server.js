const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8081;


// Conexion MySQL
const BaseDatos = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

BaseDatos.connect((err) => {

    if (err) {

        console.log("Error de conexion:", err);

    } else {

        console.log("Conectado a MySQL");

    }

});


// Ruta principal
app.get('/', (req, res) => {

    res.send('Servidor funcionando');

});


// Obtener usuarios
app.get('/usuarios', (req, res) => {

    const Consulta = `SELECT * FROM usuarios`;

    BaseDatos.query(Consulta, (err, result) => {

        if (err) {

            return res.status(500).json({
                Error: "Error en la base de datos"
            });

        }

        return res.json(result);

    });

});


// Registrar usuario
app.post('/registrar', (req, res) => {

    console.log(req.body);

    const {
        nombre,
        apellidos,
        correo,
        contraseña,
        institucion,
        fecha
    } = req.body;


    bcrypt.hash(contraseña, 10)

    .then(hash => {

        const Consulta = `
            INSERT INTO usuarios
            (
                nombre,
                apellido,
                correo,
                contrasena,
                institucion,
                fecha
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const valores = [

            nombre,
            apellidos,
            correo,
            hash,
            institucion,
            fecha

        ];


        BaseDatos.query(Consulta, valores, (err, data) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    status: "error",
                    mensaje: "Error al registrar usuario"

                });

            }

            return res.status(200).json({

                status: "ok",
                mensaje: "Usuario registrado"

            });

        });

    })

    .catch(err => {

        console.error(err);

        return res.status(500).json({

            status: "error",
            mensaje: "Error al encriptar"

        });

    });

});


// Login
app.post('/acceder', (req, res) => {

    const { correo, contraseña } = req.body;

    const Consulta = `
        SELECT * FROM usuarios
        WHERE correo = ?
    `;

    BaseDatos.query(Consulta, [correo], (err, data) => {

        if (err) {

            console.error(err);

            return res.status(500).json({

                status: "error",
                mensaje: "Error del servidor"

            });

        }

        if (data.length > 0) {

            bcrypt.compare(

                contraseña,
                data[0].contrasena,

                (err, result) => {

                    if (result) {

                        return res.status(200).json({

                            status: "ok",
                            mensaje: "Login exitoso",

                            usuario: data[0].nombre + " " + data[0].apellido,
                            rol: data[0].rol,
                            id: data[0].id,
                            perfil: data[0].perfil

                        });

                    } else {

                        return res.status(401).json({

                            status: "fail",
                            mensaje: "Contraseña incorrecta"

                        });

                    }

                }

            );

        } else {

            return res.status(401).json({

                status: "fail",
                mensaje: "Correo no encontrado"

            });

        }

    });

});


app.listen(port, () => {

    console.log(`Servidor corriendo en puerto ${port}`);

});