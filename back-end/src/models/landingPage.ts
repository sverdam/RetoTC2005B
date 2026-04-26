import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull, BeforeCreate } from 'sequelize-typescript'; 
import { Optional } from 'sequelize';

export interface LandingPageAttribute{  
  id: number;
  bannerText: Text;
  mainText: Text;
  aboutUsText: Text;
  //ubicacion: string;
  //newsletter: string;
} 

interface LandingPageCreationAttributes extends Optional<LandingPageAttribute, 'id'>{} 

@Table ({ 
  tableName: "landingPage",
  paranoid: true,
  timestamps: true
}) 

export class LandingPage extends Model<LandingPageAttribute, LandingPageCreationAttributes>{
    
    @Column 
    bannerText!: Text;
    
    @Column
    mainText!: Text;

    @Column
    aboutUsText!: Text;

    @CreatedAt 
    @Column 
    createdAt!: Date; 

    @UpdatedAt 
    @Column 
    updatedAt!: Date; 

    @DeletedAt
    @Column
    deletedAt?: Date;

    @BeforeCreate
    static async oneRowLimit(instance: LandingPage) {
        const count = await LandingPage.count();
        if (count >= 1) {
            throw new Error("Only one row is allowed in this table.");
        }
    }
}