var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'192.168.0.8',
    user:'root',
    password:'',
    database:'gaktrack',
    port:'3306',
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




