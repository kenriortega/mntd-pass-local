'use strict'

const { User, createRedisClient } = require('@mntd/db')
const { comparePassword, generateKey } = require('@mntd/crypto')

/**
 * @description Valida si el user esta autenticado
 * @param {string} username
 */
async function isAuthenticated(username) {
  return (await getSecretKey(username)) != null
}

/**
 * @description obtiene el secretKey from redis
 * @param {string} username
 */
async function getSecretKey(username) {
  const redisClient = createRedisClient()
  const secretKey = await redisClient.get(username)

  redisClient.disconnect()
  return secretKey
}

/**
 * @description Realiza el proceso de autenticacion guardando el randomkey generado por el user en la base de datos redis como session
 * @param {string} username
 * @param {string} password
 */
async function authenticate(username, password) {
  const user = await User.findOne({ where: { username } })
  if (!user) return false

  const hashed = user.password

  if (await comparePassword(password, hashed)) {
    const redisClient = createRedisClient()
    await redisClient.set(username, generateKey(password), 'EX', 3 * 60) // here
    redisClient.disconnect()
    return user
  }

  return null
}

module.exports = {
  isAuthenticated,
  getSecretKey,
  authenticate
}
