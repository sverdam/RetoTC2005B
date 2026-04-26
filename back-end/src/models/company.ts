
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, HasMany, HasOne, BelongsToMany, AfterDestroy, AfterRestore, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { User } from "./user";
import { Location } from "./location";
import { Contact } from "./contact";
import { Filter } from "./filter";
import { TextModule } from "./textModule"
import { CompanyFilter } from "./companyFilter";
import { FileModule } from './fileModule';
import { Service } from './services';
import { Certification } from './certification';
import { Capacity } from './capacities';

export enum MemberType {
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
  
  website: string;
  slogan: string;
  employees: number;
  pieces: number;
  space: number;
  capacity: string;
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
     await Certification.destroy({ where: { companyId: id } });
     await Service.destroy({where: { companyId: id } })
   }

   @AfterRestore
   static async restoreCascade(instance: Company) {
     const id = instance.id;

     await User.restore({ where: { companyId: id } });
     await Location.restore({ where: { companyId: id } });
     await Contact.restore({ where: { companyId: id } });
     await TextModule.restore({ where: { companyId: id } });
     await Certification.restore({ where: { companyId: id} });
     await Service.restore({where: { companyId: id }})
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

   @Column
   website?: string;

   @Column
   slogan?: string;
   
   @Column
   employees?: number;
   
   @Column
   pieces?: number;
   
   @Column
   space?: number;

   @Column
   capacity?: string;
  
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

   @HasOne(() => Location, {onDelete: 'CASCADE'})
   declare locations?: Location;

   @HasMany(() => Contact, {onDelete: 'CASCADE'})
   declare contacts?: Contact[];

   @HasMany(() => TextModule, {onDelete: 'CASCADE'})
   declare textModules?: TextModule[];

   @HasMany(() => FileModule, {onDelete: 'CASCADE'})
   declare fileModules?: FileModule[];

   @HasMany(() => Service, {onDelete: 'CASCADE'})
   declare services?: Service[];

   @HasMany(() => Certification, {onDelete: 'CASCADE'})
   declare certifications?: Certification[];

   @HasMany(() => Capacity, {onDelete: 'CASCADE'})
   declare capacities?: Capacity[];


   @BelongsToMany(() => Filter, { 
    through: () => CompanyFilter,
   })
   declare filters?: Filter[];
} 