import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

export interface CertificationAttribute{  
  id: number;
  companyId: number;
  name: string
} 

interface CertificationCreationAttributes extends Optional<CertificationAttribute, 'id'>{} 

@Table ({ 
  tableName: "locations",
  paranoid: true,
  timestamps: true
}) 

export class Certification extends Model<CertificationAttribute, CertificationCreationAttributes>{
    
    
   @Column 
   name!: string; 

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
