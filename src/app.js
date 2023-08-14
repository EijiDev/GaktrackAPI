//Importación de modulos 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

//Definición de constantes
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, 'public');

//Importación de rutas
const loginRouter = require('./routes/loginRoutes');

//Inicialización del servidor express
const app = express();

//Sirviendo los archivos estaticos
// app.use('/', express.static(PUBLIC_PATH));
// app.use('/inicio', express.static(path.join(PUBLIC_PATH, 'inicio')));

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
app.use('/api/v1/login', loginRouter); //Usando la ruta '/api/v1/login' de la aplicación


//Ruta de inicio de sesión de la pagina
app.get('/', (req, res) => {

    //Devuelve la pagina de inicio que contiene el indice
    res.sendFile('index.html',{
        root: PUBLIC_PATH,
    })

});

//Prueba para servir una pagina html tras redireccionamiento
app.get('/inicio', (req, res) => {

    //Mostrando la maquina que ha ingresado y realiza la consulta
    console.log(`La IP: ${req.ip} ha ingresado exitosamente a ${req.url}!😺`);

    //Envia el archivo inicio.html que esta en /api/src/public/
    res.sendFile('inicio.html',{
        root: path.join(PUBLIC_PATH, 'inicio'),
    });

})

//Configurando el puerto de la aplicación
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}!`)
    console.log(`El directorio es ${__dirname}`);
});