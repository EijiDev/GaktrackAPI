//Importa el metodo para validar usuarios del modelo de los usuarios
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Creación del controlador del login para autenticar los datos de un usuario a la hora de iniciar sesión
//Envia una respuesta desde el servidor al cliente:
//    ✅200(El usuario fue autenticado) -> Envia un token JWT para mantener la sesión
//    ❌401(El usuario no esta autorizado) -> No fue autenticado
const authenticateUser = async function (req, res, next){

    console.log(`La IP:${req.ip} esta intentando autenticarse!🕴`);

    //Obtiene las credenciales del usuario enviadas desde el cliente que estan en el cuerpo de la solicitud
    let { email, password } = req.body;

    //Pasa el correo y la contraseña a mayusculas ya que asi es como estan registrados en la base de datos
    email = email.toUpperCase();
    password = password.toUpperCase();

    try {
        //Realiza una validación de las credenciales del usuario en la base de datos la cual retorna un objeto que contiene:
            //Un valor Booleano(userExist) que valida si el usuario existe o no
                //True✅: En caso de que el usuario haya sido validado
                //False❌: En caso de que el usuario no haya sido validado
            //Un valor queryResult que almacena las filas devueltas por la consulta
        const userAuthentication = await User.validateUser(email, password);

        //Extrae el valor que confirma si el usuario existe o no en la BD del objeto de autenticación
        const userExist = userAuthentication.userExist;
        
        //En caso de que el usuario haya sido validado pasa la solicitud al siguiente middleware en la cadena
        if(userExist){
            console.log(`Usuario con acceso!😎`)
            //Almacena el ID del usuario y otros datos en un objeto que luego sera transformado y devuelto como un Token
            const userData = {
                userID: userAuthentication.queryResult.ID_USER,
                name: "Cosa",
                rol: "aun nose"
            }

            //Transforma el objeto con los datos del usuario a un token JWT
            const token = jwt.sign(userData, config.SECRET);

            //Avisando que el token fue creado
            console.log(`Su token ha sido creado!😁`)

            //Agrega el token al cuerpo de la petición
            req.body.token = token;
            
            //Envia la respuesta al cliente con el token de la sesion del usuario y la redirección
            res.status(200).json({ redireccion:'/inicio', token: token });
        } else {
            //En caso de que el usuario no haya sido validado retorna una respuesta 401 No authorized
            console.log(`La IP:${req.ip} no ha sido autorizada!😠`)
            res.status(401).send('User no authorized');
        }


    } catch(err){
        //Imprime por consola el error que se genero en la capa de la consulta a la base de datos
        console.error(err);
    }
};

//Exporta los metodos disponibles en el controlador para manejar la logica del login
module.exports = {
    authenticateUser,
};