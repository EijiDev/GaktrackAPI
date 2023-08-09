//El controlador se encarga de manejar la logica del negocio y las restricciones del mismo, es decir que maneja las entradas que envia el usuario y realiza las validaciones adecuadas para luego llevar a cabo las actualizaciones o movimientos correspondientes con el modelo(la base de datos) 
const { createUser } = require('../models/usersModel');


const UsersControllers = {
    
    //Maneja el evento de registro de un nuevo usuario en la base de datos, validando los valores entregados y notificando el error en caso que ocurra
    createUserOnList: async function({ RUT, Nombre, Apellido, Correo, Contrasenia, Telefono }){
        try {
            //Valida si hay una contraseña
            if(!Contrasenia) throw new Error('No hay ninguna contraseña');
            //Valida si hay un correo
            if(!Correo) throw new Error('No hay ningun correo');
            //Valida si hay un RUT
            if(!RUT) throw new Error('No hay ningun RUT');
            //Valida si es un rut valido segun la cantidad de digitos
            if(RUT.length > 9) throw new Error('RUT no valido');
            //Valida si es un nombre valido
            if(Nombre.length > 30) throw new Error('Nombre no valido');
            //Valida si es un apellido valido
            if(Apellido.length > 30) throw new Error('Apellido no valido');
            //Valida si es un telefono valido 
            if(Telefono.length > 9) {
                throw new Error('Telefono no valido');
            } else {
                Telefono = Number(Telefono);
            };

            //Crea el usuario en la base de datos y devuelve el resultado de la consulta en caso de ✅ o el error que se lanza para ser atrapado en este try/catch en caso de ❌ 
            const result = await createUser(RUT, Nombre, Apellido, Correo, Contrasenia, Telefono);

            //Retorna una respuesta al cliente en caso de que todo salga bien la cual contiene un mensaje de ✅ y el contenido de la consultas
            return { message: 'El usuario se ha creado correctamente', consulta: result };
        } catch (error) {
            //Notifica en el servidor que hubo un error
            console.error(`Hubo un error al crear un nuevo usuario y es: ${error}`)

            //Retorna una respuesta al cliente con el mensaje del error al atrapar el error de la consulta
            return { error: error.message };
        };
        //Logica para agregar al usuario en la lista (Vista)
    }


}

//Exportar funciones para controlar la logica de los usuarios
module.exports = UsersControllers;