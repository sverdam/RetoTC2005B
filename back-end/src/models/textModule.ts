import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

interface TextModuleAtributes{ 
  id: number; 
  title: string; 
  text: Text; 
  tier: number;
  companyId: number;
} 

interface TextModuleCreationAttributes extends Optional<TextModuleAtributes, 'id'>{} 

@Table ({ 
  tableName: "textModules",
  paranoid: true,
  timestamps: true
}) 
export class TextModule extends Model<TextModuleAtributes, TextModuleCreationAttributes>{ 

    @Column
    title!: string;

    @Column(DataType.TEXT)
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