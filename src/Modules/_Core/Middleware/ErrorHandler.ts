import chalk from 'chalk'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly status: string
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

interface IOperationalError extends Error {
  statusCode?: number
  status?: string
  isOperational?: boolean
  stack?: string
}

export const errorHandler: ErrorRequestHandler = (
  err: IOperationalError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
    return
  }

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
    return
  }

  // eslint-disable-next-line no-console
  console.error(chalk.bold.red(`\nERROR: ${err.message} `))
  res.status(500).json({
    status: 'error',
    message: err.message ?? 'Internal Server Error'
  })
}
