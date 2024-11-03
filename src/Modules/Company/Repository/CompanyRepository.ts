import BaseRepository from '../../_Core/Repository/BaseRepository.js'
import Company from '../Models/Company.model.js'

class CompanyRepository extends BaseRepository<Company> {
  constructor() {
    super(Company)
  }
}

export default CompanyRepository
