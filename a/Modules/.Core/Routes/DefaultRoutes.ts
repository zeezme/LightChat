import UsersRouter from '../../Users/Routes/Routes'

import { Router } from 'express'

const defaultRoutes = Router()

export default defaultRoutes

defaultRoutes.use('/users', UsersRouter)
