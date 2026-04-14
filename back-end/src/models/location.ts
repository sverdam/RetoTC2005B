
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

interface LocationAttributes{ 
  id: number; 
  name: string; 
  street: string; 
  number: number;
  neighborhood: string;
  postalCode: string;
  city: string; 
  country: string;
  companyId: number;
} 

interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'>{} 

@Table ({ 
  tableName: "locations",
  paranoid: true,
  timestamps: true
}) 
export class Location extends Model<LocationAttributes, LocationCreationAttributes>{ 

   @Column 
   name!: string; 

   @Column 
   street!: string; 

   @Column 
   number!: number; 

   @Column
   neighborhood!: string;

   @Column
   postalCode!: string;

   @Column
   city!: string;

   @Column
   country!: string;

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