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
  HasOne,
  PrimaryKey
} from '@sequelize/core/decorators-legacy'

import Person from '../../Person/Models/Person.model.js'

export class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  @PrimaryKey
  @Attribute(DataTypes.UUIDV4)
  @Default(DataTypes.UUIDV4)
  declare id: string

  @Attribute(DataTypes.STRING)
  declare auth0Id: string

  @Attribute(DataTypes.STRING)
  declare role: string

  @HasOne(() => Person, 'accountId')
  declare person?: NonAttribute<Person>

  @Attribute(DataTypes.INTEGER)
  declare companyId: number

  @Attribute(DataTypes.STRING)
  declare avatarUrl?: string
}

export type IAccount = InferAttributes<Account>

export default Account
