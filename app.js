//Importación de modulos 
const express = require('express');
const bodyParser = require('body-parser');

//Importación de funciones


//Importación de rutas
//const userRoute = require('./routes/userRoute');

const loginRoute = require('./routes/loginRoute');

//Definición de constantes
const PORT = process.env.PORT || 3000;

//Inicialización del servidor
const app = express();

//Configurando middlewares
app.use(bodyParser.urlencoded({ extended: false })); //Para leer el body de las peticiones/respuestas que esten codificados en formato de url
app.use(bodyParser.json()); // Para leer el body de las peticiones/respuestas que esten codificadas en formato JSON
//app.use('/api', userRoute); //Usando la ruta '/api/user' de la aplicación

app.use('/api', loginRoute); //Usando la ruta '/api/login' de la aplicación

//Ruta principal de la API
app.get('/api', (req, res) => {
    res.status(200).send('Hola mundo!');
});

//Configurando el puerto de la aplicación
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}!`)
});