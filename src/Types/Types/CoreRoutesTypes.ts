import { Request } from 'express'

export interface IDefaultRequest extends Request {
  authId?: string
  accountId?: string
  userEmail?: string
  userName?: string
  userToken?: string
  userRoles?: string[]
}
