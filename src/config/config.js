import { _dirname } from "../dirname.js";
import path from 'path';
//Importando libreria dotenv para cargar las variables de entorno en database.env el objeto process.env
import dotenv from "dotenv";
dotenv.config({ path:path.join(_dirname,"config/database.env") });
console.log(path.join(_dirname,"config/database.env"));
//Importando libreria dotenv para cargar las variables de entorno en .env en el objeto process.env
dotenv.config({ path:path.join(_dirname, "config/.env") });



//Configuración de las variables de entorno que contienen las credenciales de la bd
export const CONFIG = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    SECRET: process.env.SECRET,
}



