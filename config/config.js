//Importando libreria dotenv para cargar las variables de entorno en el objeto process.env
const dotenv = require("dotenv").config({ path:__dirname + "/.env" });

//Atrapar un error en el caso de que la configuración del dotenv no identifique el archivo .env
if(dotenv.error) throw dotenv.error;

//Configuración de las variables de entorno que contienen las credenciales de la bd
module.exports = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
}

//debo separar las config de la API y la bd