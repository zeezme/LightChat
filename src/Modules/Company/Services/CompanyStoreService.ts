import CompanyRepository from '../Repository/CompanyRepository.js'
import sequelize from '../../../../config/database.config.js'
import { ICompanyInsertParams } from './CompanyServiceTypes.js'
import { LightChatError } from '../../../Types/Errors/DefaultErrors.js'

class CompanyStoreService {
  async Run(data: ICompanyInsertParams) {
    const company = new CompanyRepository()

    const { name, accountId } = data
    try {
      await sequelize.transaction(async () => {
        const companyResponse = await company.create(
          {
            name
          },
          {
            accountId
          }
        )

        return companyResponse
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new LightChatError({
          message: error.message,
          statusCode: 400,
          name: 'CompanyStoreService',
          description: 'Error Creating Company'
        })
      }
    }
  }
}

export default new CompanyStoreService()
