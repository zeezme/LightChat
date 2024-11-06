import CompanyRepository from '../Repository/CompanyRepository.js'
import sequelize from '../../../../config/database.config.js'
import { SequelizeScopeError } from '@sequelize/core'
import { ICompanyInsertParams } from './CompanyServiceTypes.js'

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
      if (error instanceof SequelizeScopeError) {
        throw new Error(error.message)
      }
      throw new Error('Could not create company')
    }
  }
}

export default new CompanyStoreService()
