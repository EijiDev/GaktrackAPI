//Importa el metodo para validar usuarios del modelo de los usuarios
const { validateUser } = require('../models/usersModel');

//Creación de un middleware asincrono para autenticar los datos de un usuario a la hora de iniciar sesión
const userAuthentication = async function ({ body }, res, next){

    //Obtiene las credenciales del usuario que estan en el cuerpo de la solicitud
    const { email, password } = body;

    try {
        //Realiza una validación de las credenciales del usuario en la base de datos la cual retorna un Booleano
        //True✅: En caso de que el usuario haya sido validado
        //False❌: En caso de que el usuario no haya sido validado
        const validateResult = await validateUser(email, password);

        //Imprime el resultado de la validación 
        console.log(`Resultado de la validación: ${validateResult}`);

        //En caso de que el usuario haya sido validado le da autorización y pasa la solicitud al siguiente middleware en la cadena
        if(validateResult){
            body.autorized = true;
            next()
        }

        //En caso de que el usuario no haya sido validado sigue sin autorización y pasa la solicitud al siguiente middleware en la cadena
        next();

    } catch(err){
        //Imprime por consola el error que se genero en la capa de la consulta a la base de datos
        console.error(err);
    }
};

//Exporta el middleware para la autenticación del usuario
module.exports = userAuthentication;