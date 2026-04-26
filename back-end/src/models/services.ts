import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

export interface ServiceAttribute{  
  id: number;
  companyId: number;
  name: string;
  description: string;
} 

interface ServiceCreationAttributes extends Optional<ServiceAttribute, 'id'>{} 

@Table ({ 
  tableName: "services",
  paranoid: true,
  timestamps: true
}) 

export class Service extends Model<ServiceAttribute, ServiceCreationAttributes>{
    
    @Column 
    name!: string; 

        
    @Column 
    description!: string; 

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