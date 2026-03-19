import { Sequelize } from "sequelize-typescript";
import { Company } from "../models/company"; 
import { User } from "../models/user";
import { Location } from "../models/location";

const connection = new Sequelize({ 
    database: 'reto_db_final', 
    dialect: 'postgres',
    username: 'reto_admin', 
    password: 'prueba123', 
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