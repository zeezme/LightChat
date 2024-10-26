import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import router from './src/Modules/.Core/Routes/Routes'
import sequelize from './config/database.config'
import showLogo from './Scripts/ShowLogo'
import chalk from 'chalk'

const isDebugMode = process.env.DEBUG === 'true'

if (isDebugMode) {
  showLogo.run()
}

sequelize
  .authenticate()
  .then(() => {
    console.info(`Conectado ao banco de dados com sucesso!`)
  })
  .catch(err => {
    console.error(`Erro ao conectar ao banco de dados: ${err}`)
  })

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

const PORT = process.env.PORT

app.listen(PORT)
