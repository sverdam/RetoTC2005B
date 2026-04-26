import { Table, Model, Column, CreatedAt, UpdatedAt, DeletedAt, DataType, ForeignKey, BelongsTo, PrimaryKey, AllowNull, BeforeCreate } from 'sequelize-typescript'; 
import { Optional } from 'sequelize';
import { Col } from 'sequelize/lib/utils';

export interface LandingPageAttribute{  
  id: number;
  bannerHeader: string;
  bannerText: string;
  mainText: string;
  visionText: string;
  missionText: string;
  communityText: string;
  aboutUsText: string;
  contactText: string;
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
    bannerHeader!: string;

    @Column 
    bannerText!: string;
    
    @Column(DataType.TEXT)
    mainText!: string;

    @Column(DataType.TEXT)
    visionText!: string;
    
    @Column(DataType.TEXT)
    missionText!: string;
    
    @Column(DataType.TEXT)
    communityText!: string;

    @Column
    aboutUsText!: string;

    @Column
    contactText!: string;

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