import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";
import setup from "./setup";
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
import { Product } from "../models/product";
import { Certification } from "../models/certification";
import { Capacity } from "../models/capacities";

import dotenv from "dotenv";
import { LandingPage } from "../models/landingPage";
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
        Product,
        Service,
        Certification,
        Capacity,
        LandingPage
    ] 
}); 

async function run() {
  try {
    console.log('--- Starting Sequence Sync ---');
    await connection.authenticate();
    console.log('Connection established.');

    // 1. Fetch all sequences in the public schema
    const sequences = await connection.query<{ table_name: string; column_name: string }>(`
      SELECT table_name, column_name
      FROM information_schema.columns 
      WHERE column_default LIKE 'nextval%' 
      AND table_schema = 'public';
    `, { type: QueryTypes.SELECT });

    if (sequences.length === 0) {
      console.log('No sequences found to sync.');
      return;
    }

    // 2. Iterate and Reset
    for (const { table_name, column_name } of sequences) {
      // Use double quotes for identifiers to handle mixed-case names
      await connection.query(`
        SELECT setval(
          pg_get_serial_sequence('"${table_name}"', '${column_name}'), 
          coalesce(max("${column_name}"), 1), 
          max("${column_name}") IS NOT NULL
        ) 
        FROM "${table_name}";
      `);
      console.log(`Resynced: ${table_name} (${column_name})`);
    }

    console.log('--- Sync Complete ---');
  } catch (error) {
    console.error('Error during sync:', error);
    process.exit(1);
  } finally {
    await connection.close();
  }
}

run();