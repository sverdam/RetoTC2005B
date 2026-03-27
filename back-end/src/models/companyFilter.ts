import { Table, Column, Model, ForeignKey, HasOne } from 'sequelize-typescript';
import { Company } from '../models/company';
import { Filter } from '../models/filter';


@Table({
    tableName: 'companyFilters'
})

export class CompanyFilter extends Model<CompanyFilter> {
  @ForeignKey(() => Company)
  @Column
  companyId!: number;

  @HasOne(() => Company, { foreignKey: "companyId", onDelete: 'CASCADE'})
  declare company?: Company | null;

  @ForeignKey(() => Filter)
  @Column
  filterId!: number;

  @HasOne(() => Filter, { foreignKey: "filterId", onDelete: 'CASCADE'})
  declare filter?: Filter | null;
}
