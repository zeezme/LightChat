import dotenv from 'dotenv'
import express from 'express'
import defaultRoutes from './DefaultRoutes.js'
import { authMiddleware } from '../Middleware/AuthMiddleware.js'
import { supabase } from '../../../app.js'

dotenv.configDotenv()

const router = express.Router()

router.post('/login', async (request, response) => {
  if (!request.body.email || !request.body.password) {
    response.status(400).json({ error: 'Missing email or password' })
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email: request.body.email,
    password: request.body.password
  })

  if (error) {
    throw new Error(error.message)
  }

  // Dependendo a localização do servidor, essa conversão pode ficar incorreta.
  const expiration = data.session?.expires_at
    ? new Date(data.session.expires_at * 1000).toLocaleString('pt-BR')
    : null

  response.status(200).json({
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    expiration
  })
})

router.use(authMiddleware)

router.use(defaultRoutes)

export default router
