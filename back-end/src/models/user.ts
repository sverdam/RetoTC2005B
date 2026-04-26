
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

export enum UserRole {
  ADMIN = 'admin',
  EDITORMASTER = 'CLAS editor',
  EDITORCOMPANY = 'company editor',
  USER = 'user'
}

interface UserAttributes{ 
  id: number; 
  name: string; 
  email: string; 
  password: string; 
  role: UserRole;
  companyId: number;
} 

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{} 

@Table ({ 
  tableName: "users",
  paranoid: true,
  timestamps: true
}) 
export class User extends Model<UserAttributes, UserCreationAttributes>{ 

   @Column 
   name!: string; 

   @Column({
    unique: 'uniqueEmail'
   })
   email!: string; 

   @Column 
   password!: string; 

   @Column({
     type: DataType.ENUM(...Object.values(UserRole)),
     allowNull: false,
   })
   role!: UserRole;

   @ForeignKey(() => Company)
   @Column({
    type: DataType.INTEGER,
    allowNull: true,
   })
   declare companyId: number | null;

   @BelongsTo(() => Company, { foreignKey: "companyId"})
   declare company?: Company | null;

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 

   @DeletedAt
   @Column
   deletedAt?: Date;
} 