import { Table, Column, Model, DeletedAt, ForeignKey } from 'sequelize-typescript';
import { Company } from '../models/company';
import { Filter } from '../models/filter';


@Table({
    tableName: 'companyFilters',
    paranoid: true,
    timestamps: true
})

export class CompanyFilter extends Model<CompanyFilter> {

  @DeletedAt
  @Column
  deletedAt?: Date;

  @ForeignKey(() => Company)
  @Column
  companyId!: number;

  @ForeignKey(() => Filter)
  @Column
  filterId!: number;

}
