//El modelo se encarga de manejar la logica de los datos, la extracción, actualización y creacion de datos, es decir de toda la manipulación directa con la base de datos, ademas de estructurar los datos que se ingresaran
const connection = require('../config/database');


const UsersModel = {
    //Crea un usuario en la base de datos
    createUser: async function (RUT, Nombre, Apellido, Correo, Contrasenia, Telefono){
        let query = 'INSERT INTO USUARIO(RUT, NOMBRE, APELLIDO, CORREO, CONTRASENIA, TELEFONO) VALUES(?, ?, ?, ?, ?, ?)';
        try {
            //Realiza la consulta a la base de datos y espera la respuesta, en caso de que salte un error sera atrapado en el catch
            const queryResults = await connection.query(query, [RUT, Nombre, Apellido, Correo, Contrasenia, Telefono]);
            //En caso de ✅ Devolvera los registros de la consulta en forma de array
            return queryResults;
        } catch(error) {
            //En caso de que la consulta haya lanzado un error manda el error al manejador de errores en un nivel superior(Donde es llamado)
            throw error;
        }
    },

    //Busca un usuario en la base de datos con un ID en especifico
    searchUserByID: async function (ID){
        let query = 'SELECT NOMBRE FROM USUARIO WHERE ID = ?';
        try {
            let queryResults = await connection.query(query, [ID]);
            return queryResults;
        } catch(error) {
            throw error;
        }
    },

    editUserByID: function(ID, newData){

    },

    deleteUserByID: function(ID){

    }

} 

module.exports = UsersModel;