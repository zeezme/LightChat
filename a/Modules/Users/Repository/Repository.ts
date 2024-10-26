class UsersRepository {
  public async findAll(): Promise<void> {}

  public async findOne(id: string): Promise<void> {}

  public async create(data: any): Promise<void> {}

  public async update(id: string, data: any): Promise<void> {}

  public async delete(id: string): Promise<void> {}
}

export default new UsersRepository()
