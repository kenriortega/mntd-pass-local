'use strict'

const path = require('path')

module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'secretsdb',
    host: '127.0.0.1',
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
