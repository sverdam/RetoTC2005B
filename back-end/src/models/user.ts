
import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'; 
import {Optional} from 'sequelize'; 
import { Company } from "../models/company";

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface UserAttributes{ 
  id: number; 
  name: string; 
  email: string ; 
  password: string ; 
  role: UserRole ;
} 

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{} 

@Table ({ 
  tableName: "users" 
}) 
export class User extends Model<UserAttributes, UserCreationAttributes>{ 

   @Column 
   name!: string; 

   @Column 
   email!: string; 

   @Column 
   password!: string; 

   @Column({
     type: DataType.ENUM(...Object.values(UserRole)),
     allowNull: false,
   })
   rol!: UserRole;

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
} 