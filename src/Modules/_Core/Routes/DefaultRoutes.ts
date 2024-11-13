import { Router } from 'express'

import AccountRouter from '../../Account/Routes/AccountRoutes.js'
import CompanyRouter from '../../Company/Routes/CompanyRoutes.js'
import PersonRouter from '../../Person/Routes/PersonRoutes.js'

const defaultRoutes = Router()

export default defaultRoutes

defaultRoutes.use('/account', AccountRouter)

defaultRoutes.use('/person', PersonRouter)

defaultRoutes.use('/company', CompanyRouter)
