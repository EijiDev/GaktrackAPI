//El modelo se encarga de manejar la logica de los datos, la extracción, actualización y creacion de datos,
//es decir de toda la manipulación directa con la base de datos, ademas de estructurar los datos que se ingresaran

//Importando la conexion a la base de datos 
const connection = require('../config/database');


//Estoy teniendo un problema para conseguir devolver los valores del resultado de la consulta a una variable externa que me permita hacer validaciones
//https://es.stackoverflow.com/questions/273216/poner-resultado-de-una-consulta-mysql-en-otro-fragemento-de-codigo-en-node-js
//https://github.com/mysqljs/mysql#performing-queries
//https://www.youtube.com/watch?v=AO4rygo86Tw&t=723s
//https://www.dongee.com/tutoriales/borrar-tablas-en-mysql/#:~:text=El%20comando%20DROP%20TABLE%20se,la%20tabla%20que%20desea%20eliminar.


//Funcion que permite realizar una consulta a la base de datos de forma asincrona la cual devuelve una promesa
//La promesa se resuelve ✅ en caso de que no se lanze un error
//La promesa es rechazada ❌ en caso de que se lanze un error al realizarla
function runQuery(query, [...parameters], errDescript) {
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
        connection.query(query, [...parameters], (err, results, fields) => {

            //Si la consulta tiene un error entonces lanza una exception indicando el tipo de error y en que tipo de consulta fue
            if(err) reject(new Error(`${errDescript}: ${err}`));

            //Si la consulta es realizada con exito entonces resuelve la promesa con un objeto que contiene los registros en forma de objeto
            resolve(results);

        });
    });
}

//Configurando el objeto modelo que contiene los metodos de comunicación con la tabla usuario en la base de datos 
const UserModel = {


//Metodo que permite encontrar si un usuario existe en la base de datos y retorna un valor Booleano:
    //✅ True: En caso de que la consulta por el usuario devuelva 1 o más registros
    //❌ False: En caso de que la consulta por el usuario devuelva 0 

    findUser: async function (email, password){
        //Se establece la consulta que se realizara a la base de datos con los valores de escape (?)
        const QUERY = "SELECT Correo, Contrasena FROM Usuario WHERE Correo = ? AND Contrasena = ?";

        //Se establece el error correspondiente a la consulta para ser mas descriptivo
        const ERRDESCRIPT = "Hubo un error al intentar realizar la consulta para validar el usuario en la base de datos😢";

        //Variable que almacena el estado de la validación del usuario y que luego sera retornada por la funcion
        let userExist = false;

        try {

            //Realiza la consulta a la base de datos y espera hasta que haya una respuesta para almacenarla en queryResult
            let queryResult = await runQuery(QUERY, [email, password], ERRDESCRIPT);

            //Imprime los valores que devuelve la consulta en forma de tabla por consola
            console.log('Respuesta de la consulta');
            if(queryResult[0]){
                for (const row in queryResult) {
                    console.table(queryResult);
                };
            } else {
                console.log('No se han devuelto registros');
            }

            //Valida el resultado de la consulta y ve si tiene un registro -> En caso de no hacerlo significa que el usuario no existe
            //Por ende retorna un objeto que informa la no existencia del usuario
            if(!queryResult[0]){
                return { userExist };
            }
            
            //En caso de que haya un registro, el usuario existe y por ende se cambia el valor de userExist
            userExist = true;
            
            //Devuelve un objeto que contiene un valor Booleano que valida si el usuario existe junto a una propiedad queryResult que
            //almacena el primer resultado de la consulta 
            //Valor Booleano
                //True✅: Significa que el usuario fue validado y existe en la BD
                //False❌: Significa que el usuario no fue validado ya que no existe en la BD
            //Valor de la consulta
                //Almacena la primera fila coincidente que se obtuvo de la consulta
            return { userExist, queryResult: queryResult[0] }

        } catch(err){
            //Lanza una excepcion que eleva el error atrapado a la siguiente capa para ser capturado
            throw new Error(err);
        }
    },



} 

//Exportando el objeto UsersModel que contiene los metodos para comunicarse con la tabla Usuarios en la bd
module.exports = UserModel;