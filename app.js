//Importación de modulos 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

//Definición de constantes
const PORT = process.env.PORT || 3000;

//Importación de rutas
const loginRouter = require('./routes/login');

//Inicialización del servidor
const app = express();


//Configurando middlewares
    //Configuración CORS
    app.use(cors());

    // Para leer el body de las peticiones que esten codificadas en formato JSON
    app.use(bodyParser.json());

    //Para leer el body de las peticiones que esten codificados en formato de url
    app.use(bodyParser.urlencoded({ extended: false }));

    //Para servir los archivos estaticos en la carpeta public, posible front
    app.use(express.static(path.join(__dirname, 'public'))) 
//

//Configurando rutas
app.use('/api/login', loginRouter); //Usando la ruta '/api/login' de la aplicación


//Ruta principal de la API
app.get('/api', (req, res) => {
    res.status(200).send('Hola Mundo!');
});

//Prueba para servir una pagina html tras redireccionamiento
app.get('/inicio', (req, res) => {
    
    //Envia el archivo index.html que esta en /api/public/
    res.sendFile('index.html',{
        root: path.join(__dirname, 'public'),
    })
    
})

//Configurando el puerto de la aplicación
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}!`)
});