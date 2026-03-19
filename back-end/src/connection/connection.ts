import { Sequelize } from "sequelize-typescript";
import { Company } from "../models/company"; 
import { User } from "../models/user";
import { Location } from "../models/location";

const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

const userID = process.env.USERNAME_SQL ?? "unknown";
const userPassword = process.env.PASSWORD_SQL ?? "unknown";

console.log(`username: ${userID}, password: ${userPassword}`);

const connection = new Sequelize({ 
    database: 'reto_db_final', 
    dialect: 'postgres',
    username: userID, 
    password: userPassword, 
    models: [
        Company,
        User,
        Location
    ] 
}); 

async function connectionDB() {
  try {
    await connection.authenticate(); // authenticate verifica la conexión
    console.log("Conexión exitosa a la base de datos.");
    await connection.sync();
  } catch (e) {
    console.log("Error al conectar con la base de datos:", e);
  }
}

export default connectionDB;