import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  sql
} from '@sequelize/core'
import {
  Attribute,
  Default,
  HasOne,
  PrimaryKey,
  Table
} from '@sequelize/core/decorators-legacy'

import Person from '../../Person/Models/Person.model.js'

@Table({ tableName: 'accounts' })
export class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  declare id?: CreationOptional<string>

  @Attribute(DataTypes.STRING)
  declare authId: string

  @HasOne(() => Person, 'accountId')
  declare person?: NonAttribute<Person>

  @Attribute(DataTypes.INTEGER)
  declare companyId?: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  declare avatarUrl?: string
}

export type IAccount = InferAttributes<Account>

export default Account
