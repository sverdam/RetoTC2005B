import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Company } from '../models/company';
import { Filter } from '../models/filter';

interface CompanyFilterAttributes {
  companyId: number;
  filterId: number;
}

interface CompanyFilterCreationAttributes
  extends Optional<CompanyFilterAttributes, never> {}


@Table({
    tableName: 'companyFilters',
    paranoid: true,
    timestamps: true
})

export class CompanyFilter extends Model<CompanyFilterAttributes, CompanyFilterCreationAttributes> {

  @ForeignKey(() => Company)
  @Column
  companyId!: number;

  @ForeignKey(() => Filter)
  @Column
  filterId!: number;

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
