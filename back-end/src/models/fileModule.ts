import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

export enum FileType {
  LOGO = 'logo',
  IMAGE = 'image',
  DOCUMENT = 'document'
}

export interface FileModuleAttributes{  //si se modifica algo aqui, asegurate de modificarlo en fileModuleController en newData
  id: number;
  companyId: number;
  position: number;
  type: FileType;
  storedName: string | null;
  originalName: string | null;
  path: string | null;
  mimeType: string | null;
  size: number | null;

} 

interface FileModuleCreationAttributes extends Optional<FileModuleAttributes, 'id' | 'originalName' | 'path' | 'storedName' | 'size' | 'mimeType'>{} 

@Table ({ 
  tableName: "fileModules",
  //paranoid: true,
  timestamps: true
}) 
export class FileModule extends Model<FileModuleAttributes, FileModuleCreationAttributes>{ 

    @Column({
      unique: 'CompanyPosition',
      allowNull: false
    })
   position!: number; 


   @Column({
    type: DataType.ENUM(...Object.values(FileType)),
    allowNull: false,
   })
   type!: FileType;

    @Column({
      type: DataType.STRING,
      allowNull: true
    })
   storedName!: string | null;

    @Column({
      type: DataType.STRING,
      allowNull: true
    })
   originalName!: string | null; 

   @Column({
      type: DataType.STRING,
      allowNull: true
    })
   path!: string | null; 

   @Column({
      type: DataType.STRING,
      allowNull: true
    })
   mimeType!: string | null;
   
   @Column({
      type: DataType.BIGINT,
      allowNull: true
    })
   size!: number | null; 


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
/*
    @DeletedAt
    @Column
    deletedAt?: Date;
*/

}