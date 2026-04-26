import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull } from 'sequelize-typescript'; 
import { Optional } from 'sequelize'; 
import { Company } from "../models/company";

enum CapacityType {
  MATERIAL = 'material',
  PROCESS = 'process',
}

export interface CapacityAttribute{  
  id: number;
  companyId: number;
  type: CapacityType;
  description: string;
} 

interface CapacirtCreationAttributes extends Optional<CapacityAttribute, 'id'>{} 

@Table ({ 
  tableName: "capacities",
  paranoid: true,
  timestamps: true
}) 

export class Service extends Model<CapacityAttribute, CapacirtCreationAttributes>{
    
    @Column
    type!: CapacityType;
        
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