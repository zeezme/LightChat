import { Request, Response } from 'express'

class PersonController {
  public async index(request: Request, response: Response): Promise<void> {
    // Lógica para o método "index"
    response.send('Index')
  }

  public async show(request: Request, response: Response): Promise<void> {
    // Lógica para o método "show"
    response.send('Show')
  }

  public async store(request: Request, response: Response): Promise<void> {
    // Lógica para o método "store"
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

export default new PersonController()
