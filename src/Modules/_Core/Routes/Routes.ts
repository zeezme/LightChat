import dotenv from 'dotenv'
import express from 'express'
import { auth } from 'express-openid-connect'

import { IDefaultRequest } from '../../../Types/Types/CoreRoutesTypes.js'
import defaultRoutes from './DefaultRoutes.js'

dotenv.configDotenv()

const router = express.Router()

const secret = process.env.AUTH0_SECRET
const baseURL = process.env.AUTH0_BASE_URL
const clientID = process.env.AUTH0_CLIENT_ID
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL

if (!secret || !baseURL || !clientID || !issuerBaseURL) {
  throw new Error('Missing environment variables')
}

const config = {
  authRequired: true,
  auth0Logout: true,
  secret,
  baseURL,
  clientID,
  issuerBaseURL
}

router.use(auth(config))

router.use((request: IDefaultRequest, response, next) => {
  if (!request.oidc || !request.oidc.user) {
    throw new Error('Missing user information from token.')
  }

  request.userId = request.oidc.user.sub
  request.userEmail = request.oidc.user.email
  request.userName = request.oidc.user.name
  request.userRoles = request.oidc.user.roles

  // Pesquisar no accounts pelo userId, se não econtrar deve criar um

  next()
})

router.use(defaultRoutes)

export default router
