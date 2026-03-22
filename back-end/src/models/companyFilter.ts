import { Table, Column, Model, ForeignKey, HasOne } from 'sequelize-typescript';
import { Company } from '../models/company';
import { Filter } from '../models/filter';


@Table({
    tableName: 'CompanyFilters'
})

export class CompanyFilter extends Model<CompanyFilter> {
  @ForeignKey(() => Company)
  @Column
  companyId!: number;

  @HasOne(() => Company, { foreignKey: "companyId" })
  declare company?: Company | null;

  @ForeignKey(() => Filter)
  @Column
  filterId!: number;

  @HasOne(() => Filter, { foreignKey: "filterId" })
  declare filter?: Filter | null;
}
