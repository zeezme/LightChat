import { InferCreationAttributes, Model, ModelStatic } from '@sequelize/core'

import SuccessFailureEnum from '../../../Types/Enums/SuccessFailureEnum.js'
import IDefaultBaseRepositoryParams from '../../../Types/Types/CoreBaseRepositoryTypes.js'
import Log from '../Audit/Model/Log.js'

type CreationAttributes<T extends Model> = InferCreationAttributes<T>
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

class BaseRepository<T extends Model<any, any>> {
  protected model: ModelStatic<T>

  constructor(model: ModelStatic<T>) {
    this.model = model
  }

  public async create(
    data: Expand<CreationAttributes<T>>,
    { accountId, companyId, disableLogging }: IDefaultBaseRepositoryParams
  ): Promise<T> {
    let generatedSQL = ''
    let entityId: string | null = null

    try {
      const entity = await this.model.create(data as any, {
        logging: sql => {
          generatedSQL = sql
        }
      })

      entityId = (entity as any).id

      if (!entityId) {
        throw new Error(`Entity ${this.model.name} did not return an id`)
      }

      if (
        accountId &&
        companyId &&
        (disableLogging === false || disableLogging === undefined)
      ) {
        await Log.create({
          accountId,
          entity: this.model.name,
          entityId,
          action: 'create',
          query: generatedSQL,
          status: SuccessFailureEnum.SUCCESS
        })
      }

      return entity
    } catch (error) {
      const query = generatedSQL || JSON.stringify(data)
      if (
        accountId &&
        companyId &&
        (disableLogging === false || disableLogging === undefined)
      ) {
        if (accountId) {
          await Log.create({
            accountId,
            entity: this.model.name,
            entityId,
            action: 'creation-failed',
            query,
            status: SuccessFailureEnum.FAILURE
          })
        }
      }

      throw error
    }
  }
}

export default BaseRepository
