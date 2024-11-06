import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  sql
} from '@sequelize/core'
import {
  Attribute,
  Default,
  NotNull,
  PrimaryKey,
  Table
} from '@sequelize/core/decorators-legacy'

import SuccessFailureEnum from '../../../../Types/Enums/SuccessFailureEnum.js'

@Table({ tableName: 'logs' })
class Log extends Model<InferAttributes<Log>, InferCreationAttributes<Log>> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  declare id?: string

  @NotNull
  @Attribute(DataTypes.STRING)
  declare action: string

  @NotNull
  @Attribute(DataTypes.STRING)
  declare entity: string

  @NotNull
  @Attribute(DataTypes.UUID)
  declare entityId: string | null

  @Attribute(DataTypes.STRING)
  declare query: string | null

  @NotNull
  @Attribute(SuccessFailureEnum.sequelizeEnum())
  declare status: SuccessFailureEnum

  @Attribute(DataTypes.STRING)
  declare accountId?: string
}

export default Log
