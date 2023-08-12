//Importa el metodo para validar usuarios del modelo de los usuarios
const User = require('../models/User');

//Creación de un middleware asincrono para autenticar los datos de un usuario a la hora de iniciar sesión
const userAuthentication = async function ({ body }, res, next){

    //Obtiene las credenciales del usuario que estan en el cuerpo de la solicitud
    const { email, password } = body;

    try {
        //Realiza una validación de las credenciales del usuario en la base de datos la cual retorna un objeto que contiene:
        //Un valor Booleano(userExist) que valida si el usuario existe o no
            //True✅: En caso de que el usuario haya sido validado
            //False❌: En caso de que el usuario no haya sido validado
        //Un valor queryResult que almacena las filas devueltas por la consulta
        const userAuth = await User.validateUser(email, password);

        //Extrae el valor que confirma si el usuario existe o no en la BD del objeto de autenticación
        const userExist = userAuth.userExist;
        
        //Imprime el resultado de la validación 
        console.log(`Resultado de la validación: ${userExist}`);
        
        //En caso de que el usuario haya sido validado pasa la solicitud al siguiente middleware en la cadena
        if(userExist){

            //Almacena el ID del usuario en el cuerpo de la petición para mandarlo al middleware que se encarga de crear el JWT Correspondiente
            req.body.userID = userAuth.queryResult;
            next()
        }

        //En caso de que el usuario no haya sido validado retorna una respuesta 401 No authorized
        res.status(401).send('User no authorized');

    } catch(err){
        //Imprime por consola el error que se genero en la capa de la consulta a la base de datos
        console.error(err);
    }
};

//Exporta el middleware para la autenticación del usuario
module.exports = userAuthentication;