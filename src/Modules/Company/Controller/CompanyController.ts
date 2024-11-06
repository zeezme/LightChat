import { Request, Response } from 'express'
import CompanyStoreService from '../Services/CompanyStoreService.js'
import { IDefaultRequest } from '../../../Types/Types/CoreRoutesTypes.js'

class CompanyController {
  public async index(request: Request, response: Response): Promise<void> {
    // Lógica para o método "index"
    response.send('Index')
  }

  public async show(request: Request, response: Response): Promise<void> {
    // Lógica para o método "show"
    response.send('Show')
  }

  public async store(
    request: IDefaultRequest,
    response: Response
  ): Promise<void> {
    const { name } = request.body

    if (!name) {
      throw new Error('Name is required')
    }

    if (!request.accountId) {
      throw new Error('Account ID not found')
    }

    const company = await CompanyStoreService.Run({
      name,
      accountId: request.accountId
    })

    response.send(company)
  }

  public async update(request: Request, response: Response): Promise<void> {
    // Lógica para o método "update"
    response.send('Update')
  }

  public async delete(request: Request, response: Response): Promise<void> {
    // Lógica para o método "delete"
    response.send('Delete')
  }
}

export default new CompanyController()
