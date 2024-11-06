import {
  CreationOptional,
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
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(DataTypes.UUIDV4)
  declare id?: CreationOptional<string>

  @NotNull
  @Attribute(DataTypes.STRING)
  declare name: string

  @HasMany(() => Account, 'companyId')
  declare accounts?: NonAttribute<Account[]>
}

export type ICompany = InferAttributes<Company>

export default Company
