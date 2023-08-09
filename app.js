//Importación de modulos 
const express = require('express');
const bodyParser = require('body-parser');

//Importación de funciones
const connection = require('./config/database');

//Importación de rutas
const pruebaRoute = require('./routes/prueba');

//Definición de constantes
const PORT = process.env.PORT || 3000;

//Inicialización del servidor
const app = express();

//Configurando middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Para leer el body de las peticiones/respuestas que esten codificados en formato de url
app.use(bodyParser.json()); // Para leer el body de las peticiones/respuestas que esten codificadas en formato JSON
app.use('/api', pruebaRoute); //Usando la ruta '/api/prueba' de la aplicación

//Ruta principal
app.get('/api', (req, res) => {
    res.status(200).send('Hola mundo!');
});


app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}!`)
});