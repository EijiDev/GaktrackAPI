const express = require('express');
const loginRoute = express.Router();
//Importa el middleware para autenticar al usuario
const userAuthentication = require('../controllers/userAuth');

//Ruta a la que se mandan las credenciales del inicio de sesión en el cuerpo de la request
//  1.La solicitud es recibida por un middleware que se encarga de autenticar la identidad del usuario y le brinda autorización para acceder a la app
//  2. Una vez se recibe una respuesta del autenticador se valida si esta es verdadera o falsa para hacer la redireccion que corresponda
//      status code 400: en caso de que no este autorizado
//      redirección o objeto de redireccion: en caso de que este autorizado
loginRoute.post('/login',userAuthentication,({ body }, res) => {
    //Obtiene el valor de la autorizacion
    let { autorized } = body;

    //Valida si esta autorizado o no
    if(!autorized){
        //Status Code 400
        res.status(400).send('El usuario no existe');
    } else {
        //Objeto redirección
        console.log('Estoy a punto de hacer la redireccion')
        res.status(200).json({ redireccion:'/inicio', data: body })
    }
});


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

//Exporta la ruta en la cual se mandan las credenciales para el inicio de sesión de los usuarios
module.exports = loginRoute;