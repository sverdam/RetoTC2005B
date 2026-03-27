
import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany, BelongsToMany } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";
import { Filter } from "../models/filter";
import { TextModule } from "../models/textModule"
import { CompanyFilter } from "../models/companyFilter";
import { FileModule } from './fileModule';

interface CompanyAttributes{ 
  id: number; 
  name: string; 
  description: string; 
  tier: number; 
  logo: Blob; 
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

   @HasMany(() => User, {onDelete: 'CASCADE'})
   declare users?: User[];

   @HasMany(() => Location, {onDelete: 'CASCADE'})
   declare locations?: Location[];

   @HasMany(() => Contact, {onDelete: 'CASCADE'})
   declare contacts?: Contact[];

   @HasMany(() => TextModule, {onDelete: 'CASCADE'})
   declare textModules?: TextModule[];

   @HasMany(() => FileModule, {onDelete: 'CASCADE'})
   declare fileModules?: FileModule[];

   @BelongsToMany(() => Filter, { 
    through: () => CompanyFilter,
   })
   declare filters?: Filter[];
} 