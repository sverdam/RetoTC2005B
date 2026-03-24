import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

interface TextModuleAtributes{ 
  id: number; 
  title: string ; 
  text: string ; 
  tier: number ;
} 

interface TextModuleCreationAttributes extends Optional<TextModuleAtributes, 'id'>{} 

@Table ({ 
  tableName: "textModules" 
}) 
export class TextModule extends Model<TextModuleAtributes, TextModuleCreationAttributes>{ 

    @Column
    title!: string;

    @Column
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


}