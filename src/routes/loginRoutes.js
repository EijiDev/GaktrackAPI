//Importa el Router de express
import { Router } from 'express';
//Exporta los metodos a los que se tiene acceso desde la ruta /api/v1/login
export const loginRouter = Router();

//Importa el controlador para autenticar al usuario
import { LoginController } from '../controllers/loginController.js';

//Ruta a la que se mandan las credenciales del inicio de sesión en el cuerpo de la request
//  1.La solicitud es manejada por el controlador que se encarga de autenticar la identidad del usuario:
//      Autenticado:
//          Crea un token JWT que almacena el ID del usuario para mantener su sesión
//          Envia una respuesta 200 desde el servidor con el token en el cuerpo de la respuesta
//      No autenticado:
//          Envia una respuesta 401 desde el servidor de usuario no autorizado
loginRouter
    .post('/', LoginController.authenticateUser);
;


//Los middlewares son programas intermedios que manejan las solicitudes dirigidos a una ruta -> De aqui salen los routes handlers
//https://expressjs.com/en/guide/routing.html
//Los middlewares son las posibles callback que se entregan a una ruta despues del path
//https://expressjs.com/en/4x/api.html#res.redirect -> metodo para redireccionar una solicitud a otra ruta con un metodo GET
//Como escribir un middleware
//https://expressjs.com/en/guide/writing-middleware.html
//Usar los middlewares
//https://expressjs.com/en/guide/using-middleware.html#middleware.application
//https://expressjs.com/en/guide/using-middleware.html

//Manejo de excepiones con throw y try...catch
//https://bigcode.es/expresion-throw-en-javascript/

