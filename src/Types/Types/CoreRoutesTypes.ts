import { Request } from 'express'

export interface IDefaultRequest extends Request {
  userId?: string
  userEmail?: string
  userName?: string
  userRoles?: string[]
}
