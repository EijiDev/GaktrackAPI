const express = require('express');
const loginRoute = express.Router();
const userAuthentication = require('../controllers/userAuth');

//Ruta a la que se mandan las credenciales del inicio de sesión en el cuerpo de la request
//  1.La solicitud es recibida por un middleware que se encarga de validar si el usuario existe en la base de datos de la app
loginRoute.post('/login', userAuthentication,(req, res) => {
   
    console.log(req.body);
    if(!req.body.autorized){
        res.status(400).send('El usuario no existe');
    } else {
        res.status(200).send('El usuario está autorizado');
    }
});

//Estoy intentando devolver un booleano con la autorización para hacer redireccion
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

module.exports = loginRoute;