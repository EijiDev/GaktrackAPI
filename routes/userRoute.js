const express = require('express');
const { registerNewUser } = require('../controllers/usersController');
const userRouter = express.Router();

//Ruta para enlistar a todos los usuarios en la base de datos con un metodo GET
userRouter.get('/user', (req, res) => {
    res.status(200).send("Obteniendo resultados");
})

//Ruta para crear un nuevo usuario con un metodo POST
userRouter.post('/user', async (req, res) => {
    try {
        //Crea un nuevo usuario y espera a que la función devuelva un objeto con un mensaje y la consulta en caso de ✅ o un objeto de error❌
        let results = await registerNewUser(req.body);
        console.log(results);
        res.status(200).send(results.message);
    } catch(error) {
        console.error(error);
        res.send(400).send('Hubo un error al crear el registro');
    }
})

//Ruta para eliminar un usuario en especifico de la base de datos con un metodo DELETE
userRouter.delete('/user', (req, res) => {
    res.status(200).send("Eliminando registro");
})

module.exports = userRouter;