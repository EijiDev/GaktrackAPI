const express = require('express');
const { createUserOnList } = require('../controllers/usersController');
const router = express.Router();

router.get('/prueba', (req, res) => {
    res.status(200).send("Obteniendo resultados");
})

//Ruta para crear un nuevo usuario con un metodo POST
router.post('/prueba', async (req, res) => {
    try {
        //Crea un nuevo usuario y espera a que la función devuelva un objeto con un mensaje y la consulta en caso de ✅ o un objeto de error❌
        let results = await createUserOnList(req.body);
        console.log(results);
        res.status(200).send(results.message);
    } catch(error) {
        console.error(error);
        res.send(400).send('Hubo un error al crear el registro');
    }
})

router.delete('/prueba', (req, res) => {
    res.status(200).send("Eliminando registro");
})

module.exports = router;