import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

enum FileType {
  LOGO = 'logo',
  IMAGE = 'image',
  FILE = 'file'
}

interface FileModuleAtributes{ 
  id: number;
  position: number;
  type: FileType;
  fileName: string;
  route: string;
  mimeType: string;
  size: number;
  companyId: number;

} 

interface FileModuleCreationAttributes extends Optional<FileModuleAtributes, 'id'>{} 

@Table ({ 
  tableName: "fileModules" 
}) 
export class FileModule extends Model<FileModuleAtributes, FileModuleCreationAttributes>{ 


    @Column 
   position!: number; 


   @Column({
    type: DataType.ENUM(...Object.values(FileType)),
    allowNull: false,
   })
   type!: FileType;

    @Column 
   fileName!: string; 

   @Column 
   route!: string; 

   @Column 
   mimeType!: string;
   
   @Column 
   size!: number; 

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
}