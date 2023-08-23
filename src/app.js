//Importación de modulos 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { _dirname } from './dirname.js';

//Definición de constantes
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(_dirname, 'public');

//Importación de rutas
import { loginRouter } from './routes/loginRoutes.js';
import { mainRouter } from './routes/mainRoutes.js';
import {reserveRouter} from './routes/reservesRoutes.js';

//Inicialización del servidor express
const app = express();

//Configurando middlewares
    //Configuración CORS
    app.use(cors());

    // Para leer el body de las peticiones que esten codificadas en formato JSON
    app.use(bodyParser.json());

    //Para leer el body de las peticiones que esten codificados en formato de url
    app.use(bodyParser.urlencoded({ extended: false }));

    //Para servir los archivos estaticos en la carpeta public, posible front
    app.use(express.static(path.join(_dirname, 'public'))) 
//

//Configurando rutas
app.use('/api/v1/login', loginRouter); //Usando la ruta '/api/v1/login' de la aplicación

app.use('/main', mainRouter); //Usando la ruta /main para la pagina principal de la App(Calendario)

app.use('/api/v1/reserves', reserveRouter); //Usando la ruta /api/v1/reserves para manejar las reservas de salas

//Configurando el puerto de la aplicación
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}!`)
    console.log(`El directorio es ${_dirname}`);
});
