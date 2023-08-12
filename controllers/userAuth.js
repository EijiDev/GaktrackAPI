const { validateUser } = require('../models/usersModel');

const userAuthentication = async function ({ body }, res, next){
    //Obtenga las credenciales del usuario
    const email = body.email;
    const password = body.password;
    
    try {
        //Hace la consulta a la base de datos para ver si el usuario existe 
        const validateResult = await validateUser(email, password);
        console.log(`validateResult: ${validateResult}`);
        //En caso de que el usuario no exista interrumpira la solicitud enviando una respuesta devuelta al cliente informandole el resultado
        if(!validateResult){
            //res.status(400).send('El usuario no existe');
            next()
        } else {
            body.autorized = true;
            next();
        }

        //Como el usuario existe entonces continuara manejando la petición en el siguiente middleware pero modificando la propiedad de 
        //autorized a true

    } catch(err){
        console.error(err);
    }
};

module.exports = userAuthentication;