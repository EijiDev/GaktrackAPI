const express = require('express');
const loginRoute = express.Router();
const loginController = require('../controllers/loginController');
const userAuthentication = require('../controllers/auth');

//Ruta a la que se mandan las credenciales del inicio de sesión en el cuerpo de le request
loginRoute.post('/login', userAuthentication(req, res, next),(req, res) => {
    console.log(req.body);
});

module.exports = loginRoute;