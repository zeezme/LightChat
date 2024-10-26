import { Request, Response } from 'express'

class UsersController {
  public async index(req: Request, res: Response): Promise<void> {
    // Lógica para o método "index"
    res.send('Index')
  }

  public async show(req: Request, res: Response): Promise<void> {
    // Lógica para o método "show"
    res.send('Show')
  }

  public async store(req: Request, res: Response): Promise<void> {
    // Lógica para o método "store"
    res.send('Store')
  }

  public async update(req: Request, res: Response): Promise<void> {
    // Lógica para o método "update"
    res.send('Update')
  }

  public async delete(req: Request, res: Response): Promise<void> {
    // Lógica para o método "delete"
    res.send('Delete')
  }
}

export default new UsersController()