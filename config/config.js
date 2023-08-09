//Importando libreria dotenv
const dotenv = require('dotenv').config();

//Configuración de las variables de entorno de la aplicación
module.exports = {
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_NAME: process.env.DATABASE_NAME || "gaktrack",
    DATABASE_USER: process.env.DATABASE_USER || "root",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE_PORT: process.env.DATABASE_PORT || "3306",
}