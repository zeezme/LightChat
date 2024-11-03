import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from '@sequelize/core'
import {
  Attribute,
  Default,
  HasMany,
  NotNull,
  PrimaryKey
} from '@sequelize/core/decorators-legacy'

import Account from '../../Account/Models/Account.model.js'

export class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  @Attribute(DataTypes.UUIDV4)
  @NotNull
  @Default(DataTypes.UUIDV4)
  @PrimaryKey
  declare id: string

  @Attribute(DataTypes.STRING)
  declare name: string

  @Attribute(DataTypes.STRING)
  declare role: string

  @HasMany(() => Account, 'companyId')
  declare accounts?: NonAttribute<Account>
}

export type ICompany = InferAttributes<Company>

export default Company
