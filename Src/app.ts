import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'

import router from './Modules/.Core/Routes/Routes'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${PORT}`)
})
