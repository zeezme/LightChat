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

export class Person extends Model<
  InferAttributes<Person>,
  InferCreationAttributes<Person>
> {
  @Attribute(DataTypes.UUIDV4)
  @NotNull
  @Default(DataTypes.UUIDV4)
  @PrimaryKey
  declare id: string

  @Attribute(DataTypes.STRING)
  declare name: string

  @NotNull
  @Attribute(DataTypes.INTEGER)
  declare accountId: number

  // @ForeignKey(() => Address)
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // addressId?: string;

  // @BelongsTo(() => Address)
  // address?: Address;

  // @BelongsTo(() => Account)
  // account!: Account
}

export type IPerson = InferAttributes<Person>

export default Person
