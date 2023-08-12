//Importa el modulo mysql
let mysql = require('mysql');
//Importa las credenciales de la base de datos
const config = require('../config/config');

//Diferencia entre una conexión Pool y una conexión normal
//https://es.stackoverflow.com/questions/359715/cu%C3%A1l-ser%C3%ADa-la-diferencia-entre-usar-un-pool-o-usar-una-conexion-tradicional-a-l 
//Pool: Crea una piscina con tantas conexiones como sean necesarias y las mantiene vivas para asignarlas cuando sea necesario, asigna las 
//conexiones disponibles y tambien libera esa conexion tras su uso para reasignarse en otra ocasion
//https://es.stackoverflow.com/questions/416924/es-recomendable-abrir-conexion-mysql-cada-vez-que-un-usuario-haga-algo
//https://www.npmjs.com/package/mysql#pooling-connections

//Crea una conexión con las credenciales correspondientes de la base de datos en prod
let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    port: config.DATABASE_PORT,
});

//Intenta obtener una conexión del pool para validar que se puede conectar a la base de datos
try {
    pool.getConnection((err, connection) => {
        //Si no se logra hacer la conexión entonces se lanza una excepción con un objeto error que describe el error junto a sus detalles
        if(err) throw new Error(`No se pudo conectar a la base de datos!😭 ERROR: ${err.message}`);

        //En caso de que se logre la conexión entonces lanza un mensaje de conexión exitosa mas la conexion
        console.log('Conexión a la base de datos éxitosa! HILO DE CONEXIÓN: ' + connection.threadId + '😀');

        //Libera la conexión
        connection.release();
    })

} catch (err) {

    //En el caso de no hacer la conexión la excepción sera atrapada e imprimida por consola mostrando la descripción del error y sus detalles  
    console.error(err);

    //Asigna NULL a la variable connection para asi evitar que el servidor se detenga en caso de no poder conectarse a la bd
    connection = null;
}

//Se exporta el pool de conexiones a la base de datos
module.exports = pool; 

//Tuve que crear un nuevo usuario XAMPP?? Al que le otorgue todos los privilegios y se le indique servidor "%"(Que puede ser accedido desde cualquier ip remota o local), ademas de utilizar como host la IP de mi LAN inalambrica[obligatorio] (IP XAMPP para conectarse a mi xampp desde una pc externa), siguiendo de ejemplo la solución de: https://dev.to/upsier/node-js-error-connect-econnrefused-how-to-connect-with-phpmyadmin-2ekb y https://stackoverflow.com/questions/40477625/nodejs-mysql-er-access-denied-error-access-denied-for-user-rootlocalhost 





