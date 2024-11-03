import { Request, Response } from 'express'
import { v4 } from 'uuid'

import AccountRepository from '../Repository/AccountRepository.js'

class AccountController {
  public async index(request: Request, response: Response): Promise<void> {
    // Lógica para o método "index"
    response.send('Index')
  }

  public async show(request: Request, response: Response): Promise<void> {
    // Lógica para o método "show"

    response.send('Show')
  }

  public async store(request: Request, response: Response): Promise<void> {
    const accountRepository = new AccountRepository()
    // const company = new CompanyRepository()

    await accountRepository.create(
      {
        auth0Id: '',
        role: '',
        companyId: 2,
        id: v4()
      },
      {
        accountId: 1,
        companyId: 1
      }
    )

    response.send('Store')
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

export default new AccountController()
