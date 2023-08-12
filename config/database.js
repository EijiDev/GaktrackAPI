//Importa el modulo mysql
let mysql = require('mysql');
//Importa las credenciales de la base de datos
const config = require('../config/config');

//Crea una conexión con las credenciales correspondientes de la base de datos en prod
let connection = mysql.createConnection({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    port: config.DATABASE_PORT,
});

//Se intenta conectar a la base de datos
try {
    connection.connect(err => {

        //Si no se logra hacer la conexión entonces se lanza una excepción con un objeto error que describe el error junto a sus detalles
        if(err) throw new Error(`No se pudo conectar a la base de datos!😭 ERROR: ${err.message}`);

        //En caso de que se logre la conexión entonces lanza un mensaje de conexión exitosa
        console.log('Conexión a la base de datos éxitosa!');

    })

} catch (err) {

    //En el caso de no hacer la conexión la excepción sera atrapada e imprimida por consola mostrando la descripción del error y sus detalles  
    console.error(err);

    //Asigna NULL a la variable connection para asi evitar que el servidor se detenga en caso de no poder conectarse a la bd
    connection = null;
}

//Se exporta un objeto de conexión o null en caso de error
module.exports = connection; 

//Tuve que crear un nuevo usuario XAMPP?? Al que le otorgue todos los privilegios y se le indique servidor "%"(Que puede ser accedido desde cualquier ip remota o local), ademas de utilizar como host la IP de mi LAN inalambrica[obligatorio] (IP XAMPP para conectarse a mi xampp desde una pc externa), siguiendo de ejemplo la solución de: https://dev.to/upsier/node-js-error-connect-econnrefused-how-to-connect-with-phpmyadmin-2ekb y https://stackoverflow.com/questions/40477625/nodejs-mysql-er-access-denied-error-access-denied-for-user-rootlocalhost 





