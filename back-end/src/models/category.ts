
import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Filter } from '../models/filter';

interface CategoryAttributes{ 
  id: number; 
  name: string; 
} 

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'>{} 

@Table ({ 
  tableName: "categories",
  paranoid: true,
  timestamps: true
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

   @DeletedAt
   @Column
   deletedAt?: Date;

   @HasMany(() => Filter, {onDelete: 'CASCADE'})
      declare filters?: Filter[];
} 