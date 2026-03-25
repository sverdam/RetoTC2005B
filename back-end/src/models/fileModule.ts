import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

enum FileType {
  LOGO = 'logo',
  IMAGE = 'image',
  DOCUMENT = 'document'
}

interface FileModuleAtributes{  //si se modifica algo aqui, asegurate de modificarlo en fileModuleController en newData
  id: number;
  companyId: number;
  position: number;
  type: FileType;
  storedName: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;


} 

interface FileModuleCreationAttributes extends Optional<FileModuleAtributes, 'id' | 'originalName' | 'path' | 'storedName' | 'size' | 'mimeType'>{} 

@Table ({ 
  tableName: "fileModules" 
}) 
export class FileModule extends Model<FileModuleAtributes, FileModuleCreationAttributes>{ 

    @Column({
      unique: 'CompanyPosition'
    })
   position!: number; 


   @Column({
    type: DataType.ENUM(...Object.values(FileType)),
    allowNull: false,
   })
   type!: FileType;

    @Column 
   storedName!: string;

    @Column 
   originalName!: string; 

   @Column 
   path!: string; 

   @Column 
   mimeType!: string;
   
   @Column 
   size!: number; 


   @ForeignKey(() => Company)
   @Column({
    type: DataType.INTEGER,
    unique: 'CompanyPosition',
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