
import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany} from 'sequelize-typescript'; 
import {Optional} from 'sequelize'; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";

interface CompanyAttributes{ 
  id: number; 
  name: string; 
  description: string; 
  tier: number ; 
  logo: Blob ; 
} 

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'>{} 

@Table ({ 
  tableName: "companies" 
}) 
export class Company extends Model<CompanyAttributes, CompanyCreationAttributes>{ 


// Here, TS infers Data Type from the JS Type 
  // The ! means that the variable title wont be null or undefine.  
   @Column 
   name!: string; 

  // Here, we set the Data Type explicity 
  // The ? means the variable can be null or undefined 
   @Column({ 
      type: DataType.STRING 
   }) 
   description?: string; 

   @Column 
   tier!: number; 

   @Column({ 
      type: DataType.BLOB 
   }) 
   logo?: Blob; 

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 

   @HasMany(() => User)
   declare users?: User[];

   @HasMany(() => Location)
   declare locations?: Location[];

   @HasMany(() => Contact)
   declare contacts?: Contact[];
} 