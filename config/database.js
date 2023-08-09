var mysql = require('mysql');
const config = require('../config/config');

var connection = mysql.createConnection({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    port: config.DATABASE_PORT,
});

connection.connect(err => {
    if(err) throw new Error(err);
    console.log('Conexión a la base de datos éxitosa!');
})

module.exports = connection; 

//Tuve que crear un nuevo usuario XAMPP?? Al que le otorgue todos los privilegios y se le indique servidor "%"(Que puede ser accedido desde cualquier ip remota o local), ademas de utilizar como host la IP de mi LAN inalambrica[obligatorio] (IP XAMPP para conectarse a mi xampp desde una pc externa), siguiendo de ejemplo la solución de: https://dev.to/upsier/node-js-error-connect-econnrefused-how-to-connect-with-phpmyadmin-2ekb y https://stackoverflow.com/questions/40477625/nodejs-mysql-er-access-denied-error-access-denied-for-user-rootlocalhost 

/* 

connection.connect(function(err){
    console.log(err);
    if(err) throw new Error(err);
    console.log("Conexion exitosa!");
});


connection.query('SELECT * FROM USUARIO', (err, result, values) => {
    if(err) throw new Error(err);
    console.log(result);
    connection.end();
});

*/




