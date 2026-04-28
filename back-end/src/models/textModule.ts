import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

interface TextModuleAttributes{ 
  id: number; 
  title: string; 
  text: string; 
  tier: number;
  companyId: number;
} 

interface TextModuleCreationAttributes extends Optional<TextModuleAttributes, 'id'>{} 

@Table ({ 
  tableName: "textmodules",
  paranoid: true,
  timestamps: true
}) 
export class TextModule extends Model<TextModuleAttributes, TextModuleCreationAttributes>{ 

    @Column
    title!: string;

    @Column({type: DataType.TEXT})
    text!: string;

    @Column
    tier!: number;

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