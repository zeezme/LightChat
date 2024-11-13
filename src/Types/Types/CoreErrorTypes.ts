export interface ILightChatError extends Error {
  statusCode?: number
  description: string
  status?: string
  isOperational?: boolean
  stack?: string
}
