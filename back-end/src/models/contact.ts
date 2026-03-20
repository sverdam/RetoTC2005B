
import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone',
}

interface ContactAttributes{ 
  id: number; 
  type: ContactType; 
  contactInfo: string ; 
} 

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'>{} 

@Table ({ 
  tableName: "contacts" 
}) 
export class Contact extends Model<ContactAttributes, ContactCreationAttributes>{ 

   @Column({
    type: DataType.ENUM(...Object.values(ContactType)),
    allowNull: false,
   })
   rol!: ContactType;

   @Column 
   contactInfo!: string; 

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