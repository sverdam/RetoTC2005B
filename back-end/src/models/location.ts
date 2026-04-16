
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

interface LocationAttributes{ 
  id: number; 
  address: string;
  mapLink: string;
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
   address!: string; 

   @Column 
   mapLink!: string; 

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