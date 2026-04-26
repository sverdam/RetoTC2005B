
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

export enum ContactType {
  EMAIL = 'email',
  PHONE = 'phone',
}

interface ContactAttributes{ 
  id: number; 
  type: ContactType; 
  position?: string;
  contactInfo: string;
  companyId: number; 
} 

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'>{} 

@Table ({ 
  tableName: "contacts",
  paranoid: true,
  timestamps: true
}) 
export class Contact extends Model<ContactAttributes, ContactCreationAttributes>{ 

   @Column({
    type: DataType.ENUM(...Object.values(ContactType)),
    allowNull: false,
   })
   type!: ContactType;

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

   @DeletedAt
   @Column
   deletedAt?: Date;
} 