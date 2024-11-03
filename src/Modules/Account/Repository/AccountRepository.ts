import BaseRepository from '../../_Core/Repository/BaseRepository.js'
import Account from '../Models/Account.model.js'

class AccountRepository extends BaseRepository<Account> {
  constructor() {
    super(Account)
  }
}

export default AccountRepository
