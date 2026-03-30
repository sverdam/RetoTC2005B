
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Category } from "../models/category";
import { Company } from "../models/company";
import { CompanyFilter } from "../models/companyFilter";

interface FilterAttributes{ 
  id: number; 
  name: string; 
  tier: number;
  categoryId: number;
} 

interface FilterCreationAttributes extends Optional<FilterAttributes, 'id'>{} 

@Table ({ 
  tableName: "filters",
  paranoid: true,
  timestamps: true
}) 
export class Filter extends Model<FilterAttributes, FilterCreationAttributes>{ 

   @Column 
   name!: string; 

   @Column 
   tier!: number; 

   @ForeignKey(() => Category)
   @Column({
    type: DataType.INTEGER,
    allowNull: true,
   })
   declare categoryId: number | null;

   @BelongsTo(() => Category, { foreignKey: "categoryId"})
   declare category?: Category | null;

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 

   @DeletedAt
   @Column
   deletedAt?: Date;

   @BelongsToMany(() => Company, { 
    through: () => CompanyFilter,
   })
   declare companies?: Company[];
} 