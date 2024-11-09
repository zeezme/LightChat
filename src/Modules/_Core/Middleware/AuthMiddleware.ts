import Account from '../../Account/Models/Account.model.js'
import AccountRepository from '../../Account/Repository/AccountRepository.js'
import { IDefaultRequest } from '../../../Types/Types/CoreRoutesTypes.js'
import { NextFunction, Response } from 'express'
import { supabase } from '../../../app.js'

export const authMiddleware = async (
  request: IDefaultRequest,
  response: Response,
  next: NextFunction
): Promise<void> => {
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

    if (account.companyId === null) {
      response.status(403).json({
        message:
          'Seu usuário está no processo de aprovação, para maiores informações entre em contato com o suporte.'
      })
    } else {
      next()
    }
  }
}
