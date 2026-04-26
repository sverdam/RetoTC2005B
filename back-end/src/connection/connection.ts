import { Sequelize } from "sequelize-typescript";
import { Company } from "../models/company"; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";
import { Category } from "../models/category";
import { Filter } from "../models/filter";
import { CompanyFilter } from "../models/companyFilter";
import { TextModule } from "../models/textModule";
import { Service } from "../models/services";
import { FileModule } from "../models/fileModule";
import dotenv from "dotenv";
import { Certification } from "../models/certification";
dotenv.config({ path: "./.env" });

const userID = process.env.DB_USERNAME ?? "unknown";
const userPassword = process.env.DB_PASSWORD ?? "unknown";
const database_name = process.env.DB_NAME ?? "unknown";

console.log(`username: ${userID}, password: ${userPassword}`);

const connection = new Sequelize({ 
    database: database_name, 
    dialect: 'postgres',
    username: userID, 
    password: userPassword, 
    models: [
        Company,
        User,
        Location,
        Contact,
        Category,
        Filter,
        CompanyFilter,
        TextModule,
        FileModule,
        Service,
        Certification
    ] 
}); 

async function connectionDB() {
  try {
    await connection.authenticate(); // authenticate verifies the connection
    console.log("Conexión exitosa a la base de datos.");
    await connection.sync();
  } catch (e) {
    console.log("Error al conectar con la base de datos:", e);
  }
}

export default connectionDB;