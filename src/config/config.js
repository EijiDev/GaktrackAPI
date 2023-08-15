//Importando libreria dotenv para cargar las variables de entorno en database.env el objeto process.env
import dotenv from "dotenv";
let database = dotenv.config({ path:__dirname + "/database.env" });
//Importando libreria dotenv para cargar las variables de entorno en .env en el objeto process.env
const credentials  = dotenv.config({ path:__dirname + "/.env" });

//Configuración de las variables de entorno que contienen las credenciales de la bd
export const CONFIG = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    SECRET: process.env.SECRET,
}



