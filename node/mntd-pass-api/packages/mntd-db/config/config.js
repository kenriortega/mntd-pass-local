'use strict'

const path = require('path')

// ok: MIgrate to .env add into you .env file this var and replace for your settings
module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    loggin: false
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'secrets_dev.db')
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
}
