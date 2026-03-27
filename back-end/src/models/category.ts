
import { Table, Model, Column, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Filter } from '../models/filter';

interface CategoryAttributes{ 
  id: number; 
  name: string; 
} 

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'>{} 

@Table ({ 
  tableName: "category" 
}) 
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes>{ 

   @Column 
   name!: string; 

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 

   @HasMany(() => Filter, {onDelete: 'CASCADE'})
      declare filters?: Filter[];
} 