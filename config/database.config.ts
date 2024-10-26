import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

if (!dbName || !dbUser || !dbPass) {
  throw new Error('Missing database configuration')
}

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
})

export default sequelize
