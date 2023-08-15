import { runQuery } from '../utils/runQuery.js';

//El modelo se encarga de manejar la logica de los datos,la logica de negocio(Las funciones que tiene nuestra aplicación las cuales puede realizar el usuario) 
//Dentro de estas suelen ir la extracción, actualización y creacion de datos, se encargan de hacer las validaciones correspondientes para manejar
//La integridad de nuestros datos en la base de datos y la persistencia de los datos que enviamos en ella(EJ: validar si un usuario con x correo ya existe, o con x id)
//es decir de toda la manipulación directa con la base de datos, ademas de estructurar los datos que se ingresaran

//Estoy teniendo un problema para conseguir devolver los valores del resultado de la consulta a una variable externa que me permita hacer validaciones
//https://es.stackoverflow.com/questions/273216/poner-resultado-de-una-consulta-mysql-en-otro-fragemento-de-codigo-en-node-js
//https://github.com/mysqljs/mysql#performing-queries
//https://www.youtube.com/watch?v=AO4rygo86Tw&t=723s
//https://www.dongee.com/tutoriales/borrar-tablas-en-mysql/#:~:text=El%20comando%20DROP%20TABLE%20se,la%20tabla%20que%20desea%20eliminar.
//El pool va a permitir manejar multiples conexiones concurrentes y realizar multiples consultas dentro de una misma conexión mientras otras
//hacen lo mismo

//Exportando la clase UserModel que contiene los metodos para comunicarse con la tabla USER en la bd
//Configurando la clase modelo que contiene los metodos de comunicación con la tabla USER en la base de datos 
export class UserModel {


//Metodo que permite validar si un usuario existe en la base de datos y retorna un valor Booleano:
    //✅ True: En caso de que la consulta por el usuario devuelva 1 o más registros
    //❌ False: En caso de que la consulta por el usuario devuelva 0 
    static async validateUserLogin({ email, password }){
        //Pasa el correo y la contraseña a mayusculas ya que asi es como estan registrados en la base de datos
        email = email.toUpperCase();
        password = password.toUpperCase();
        
        //Se establece la consulta que se realizara a la base de datos con los valores de escape (?)
        const QUERY = "SELECT ID_USER, USER_EMAIL, USER_PASSWORD FROM USER WHERE USER_EMAIL = ? AND USER_PASSWORD = ?";

        //Se establece el error correspondiente a la consulta para ser mas descriptivo
        const ERRDESCRIPT = "Hubo un error al intentar realizar la consulta para validar el usuario en la base de datos😢";

        //Variable que almacena el estado de la validación del usuario y que luego sera retornada por la funcion
        let userExist = false;

        try {

            //Realiza la consulta a la base de datos y espera hasta que haya una respuesta para almacenarla en queryResult
            let queryResult = await runQuery(QUERY, [email, password], ERRDESCRIPT);

            console.log(`Consulta finalizada!🕴`)

            //Imprime los valores que devuelve la consulta en forma de tabla por consola
            console.log('Respuesta de la consulta: ⬇');
            if(queryResult[0]){
                for (const row in queryResult) {
                    console.table(queryResult);
                };
            } else {
                console.log('No se han devuelto registros.🤷‍♀️🤷‍♂️');
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
            return { userExist, user: queryResult[0] }

        } catch(err){
            //Lanza una excepcion que eleva el error atrapado a la siguiente capa para ser capturado
            throw new Error(err);
        }
    };

    static async getUserID({ email, password }){

    }

} 

