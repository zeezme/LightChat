import dotenv from 'dotenv'
import express, { Response } from 'express'
import defaultRoutes from './DefaultRoutes.js'
import { createClient } from '@supabase/supabase-js'
import { IDefaultRequest } from '../../../Types/Types/CoreRoutesTypes.js'
import Account from '../../Account/Models/Account.model.js'
import AccountRepository from '../../Account/Repository/AccountRepository.js'

dotenv.configDotenv()

const router = express.Router()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

router.post('/login', async (request, response) => {
  if (!request.body.email || !request.body.password) {
    response.status(400).json({ error: 'Missing email or password' })
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email: request.body.email,
    password: request.body.password
  })

  if (error) {
    response.status(500).json({ error: error.message })
  } else {
    response.status(200).json(data)
  }
})

router.use(async (request: IDefaultRequest, response: Response, next) => {
  const token = request.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return next(new Error('Missing authorization header'))
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    let account = await Account.findOne({
      where: { authId: data.user.id }
    })

    if (!account) {
      const accountRepository = new AccountRepository()
      account = await accountRepository.create(
        {
          authId: data.user.id
        },
        {
          disableLogging: true
        }
      )
    }

    request.accountId = account.id
    request.authId = account.authId

    next()
  }
})

router.use(defaultRoutes)

export default router
