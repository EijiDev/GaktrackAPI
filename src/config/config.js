try {
    //Importando libreria dotenv para cargar las variables de entorno en database.env en el objeto process.env
    const database = require("dotenv").config({ path:__dirname + "/database.env" });
    
    //Importando libreria dotenv para cargar las variables de entorno en .env en el objeto process.env
    const credentials  = require("dotenv").config({ path:__dirname + "/.env" });
} catch(e){
    //Atrapar un error en el caso de que la configuración de las variables de entorno en database.env no se puedan pasar al process.env
    console.error(new Error(`Hubo un error al configurar las variables de entorno ${e}`))
}




//Configuración de las variables de entorno que contienen las credenciales de la bd
module.exports = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    SECRET: process.env.SECRET,
}

