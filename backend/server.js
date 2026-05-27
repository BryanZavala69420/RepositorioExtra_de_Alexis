const  express = require('express');
const mysql = require('mysql');

require('dotenv').config({path: '../.env'})




//app
const app = express();
//puerto
const port = process.env.PORT || 3000;


//base de datos en mysql
const BaseDatos = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})








app.get('/', (req, res) => res.send('Esto esta siendo ssss martirio aaaaaaaaaa!'))

app.get('/usuarios', (req, res)=>{
    const Consulta =   `SELECT * FROM usuarios`;

    BaseDatos.query(Consulta, (err, result)=>{
        if(err){
            res.status(500).json({Error: "Hubo un error en la base de datos"})
        }
    
        return res.json(result);


    })







})

app.listen(port, () => {
    console.log('conectandose en el puerto 3001');
});