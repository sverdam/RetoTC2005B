
import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { FileModule } from './fileModule';

interface ProductAttributes{ 
  id: number;
  name: string;
  fileModuleId: number;
  description: string;
} 

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'>{} 

@Table ({ 
  tableName: "products",
  timestamps: true
}) 
export class Product extends Model<ProductAttributes, ProductCreationAttributes>{ 

   @Column 
   name!: string; 

   @Column 
   description!: string; 

   @ForeignKey(() => FileModule)
   @Column({
    type: DataType.INTEGER,
    allowNull: true,
   })
   declare fileModuleId: number | null;

   @BelongsTo(() => FileModule, { foreignKey: "fileModuleId"})
   declare fileModule?: FileModule | null;

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date;
} 