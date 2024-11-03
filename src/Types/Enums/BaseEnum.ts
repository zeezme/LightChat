import { DataTypes } from '@sequelize/core'

abstract class BaseEnum {
  /**
   * Retorna todos os valores string do enum.
   * @returns {string[]}
   */
  static typeEnum(): string[] {
    return Object.values(this).filter(
      value => typeof value === 'string'
    ) as string[]
  }

  /**
   * Define uma função `sequelizeEnum` que retorna o tipo ENUM configurado com os valores da classe.
   */
  static sequelizeEnum(
    ...args: (string | { values: string[] })[]
  ): ReturnType<typeof DataTypes.ENUM> {
    const values =
      args.length === 1 && typeof args[0] === 'object' && 'values' in args[0]
        ? args[0].values
        : (args as string[]).length > 0
          ? (args as string[])
          : this.typeEnum()

    return DataTypes.ENUM(...values)
  }
}

type EnumType<T extends typeof BaseEnum> = Extract<T[keyof T], string>

export { BaseEnum, EnumType }
