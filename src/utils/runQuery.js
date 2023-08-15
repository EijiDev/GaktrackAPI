//Importando la conexion a la base de datos 
import pool from '../config/database.js';

//Funcion que permite realizar una consulta a la base de datos de forma asincrona la cual devuelve una promesa
//La promesa se resuelve ✅ en caso de que no se lanze un error
//La promesa es rechazada ❌ en caso de que se lanze un error al realizarla
export function runQuery(query, [...parameters], errDescript) {
    return new Promise((resolve, reject) => {

    //La consulta SELECT devuelve un objeto parecido a un array con objetos donde cada objeto en el arreglo representa un registro de la tabla
    //El objeto contiene como propiedades los valores de los atributos de la tabla
    //EJ de Consulta: SELECT Correo, Contrasena FROM Usuario;
    //EJ de Respuesta: [{ "Correo":"papo", "Contrasena":"Pepe" },
    //                  { "Correo":"Padilla", "Contrasena":"Pao" },
    //                  { "Correo":"Pepe", "Contrasena":"SoyPepe" }]
    //Para acceder a algun registro n se debe de almacenar dicho arreglo y acceder de la siguiente forma:
    //results[n](hasta aqui devuelve el objeto entero).propiedad(Hasta aqui devuelve el valor de un atributo en especifico)
    //El arreglo devuelto es objeto enumerable mas no iterable

    //Realiza la consulta en la base de datos
        pool.query(query, [...parameters], (err, results, fields) => {
            console.log(`La consulta ha sido ejecutada!😁`)

            //Si la consulta tiene un error entonces lanza una exception indicando el tipo de error y en que tipo de consulta fue
            if(err) reject(new Error(`${errDescript}: ${err}`));

            //Si la consulta es realizada con exito entonces resuelve la promesa con un objeto que contiene los registros en forma de objeto
            resolve(results);

        });
    });
}