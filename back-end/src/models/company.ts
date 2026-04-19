
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, HasMany, BelongsToMany, AfterDestroy, AfterRestore, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";
import { Filter } from "../models/filter";
import { TextModule } from "../models/textModule"
import { CompanyFilter } from "../models/companyFilter";
import { FileModule } from './fileModule';

enum MemberType {
  AFFILIATE = 'Affiliate',
  ASSOCIATE = 'Associate',
  ADMIN = 'Admin',
}

interface CompanyAttributes{ 
  id: number; 
  name: string; 
  description: string; 
  tier: number; 
  memberType: MemberType;
} 

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'>{} 

@Table ({ 
  tableName: "companies",
  paranoid: true,
  timestamps: true
}) 
export class Company extends Model<CompanyAttributes, CompanyCreationAttributes>{ 

  // Sequelize Hooks
   @AfterDestroy
   static async deleteCascade(instance: Company) {
     const id = instance.id;
    
     await User.destroy({ where: { companyId: id } });
     await Location.destroy({ where: { companyId: id } });
     await Contact.destroy({ where: { companyId: id } });
     await TextModule.destroy({ where: { companyId: id } });
     await FileModule.destroy({ where: { companyId: id } });
   }

   @AfterRestore
   static async restoreCascade(instance: Company) {
     const id = instance.id;

     await User.restore({ where: { companyId: id } });
     await Location.restore({ where: { companyId: id } });
     await Contact.restore({ where: { companyId: id } });
     await TextModule.restore({ where: { companyId: id } });
     //await FileModule.restore({ where: { companyId: id } });
   }


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
      type: DataType.ENUM(...Object.values(MemberType)),
      allowNull: false,
    })
    memberType!: MemberType;

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 

   @DeletedAt
   @Column
   deletedAt?: Date;

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