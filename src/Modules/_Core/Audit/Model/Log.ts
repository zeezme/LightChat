import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from '@sequelize/core'
import {
  Attribute,
  Default,
  NotNull,
  PrimaryKey
} from '@sequelize/core/decorators-legacy'

import SuccessFailureEnum from '../../../../Types/Enums/SuccessFailureEnum.js'

class Log extends Model<InferAttributes<Log>, InferCreationAttributes<Log>> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  @Default(DataTypes.UUIDV4)
  declare id?: string

  @NotNull
  @Attribute(DataTypes.STRING)
  declare action: string

  @NotNull
  @Attribute(DataTypes.STRING)
  declare entity: string

  @NotNull
  @Attribute(DataTypes.INTEGER)
  declare entityId: number | null

  @Attribute(DataTypes.STRING)
  declare query: string | null

  @NotNull
  @Attribute(SuccessFailureEnum.sequelizeEnum())
  declare status: SuccessFailureEnum

  @NotNull
  @Attribute(DataTypes.INTEGER)
  declare accountId: number
}

export default Log
