'use strict'

const db = require('@mntd/db')
const { hashPassword, comparePassword, generateKey } = require('@mntd/crypto')
const { updateAllSecret } = require('./secret')
module.exports = {
  /**
   * Permite crear un usuario dado los siguientes parametros
   *
   * @param {string} username
   * @param {string} password
   * @param {string} [fullName=""]
   * @param {string} [role=""]
   * @returns {User} User
   */
  async createUser(username, password, fullName = '', role = 'basic') {
    return db.User.create({
      username,
      password,
      fullName,
      role
    })
  },

  /**
   * Lista los usuarios de la Base de datos
   *
   * @returns {Array<User>} Array<User>
   */
  listUsers() {
    return db.User.findAndCountAll()
  },
  async changePassword(username, oldPassword, newPassword) {
    const user = await db.User.findOne({ where: { username } })
    const compared = await comparePassword(oldPassword, user.password)
    if (!compared) {
      throw new Error('Invalid Password')
    }

    user.password = await hashPassword(newPassword)
    await user.save()

    const oldKey = generateKey(oldPassword)
    const newKey = generateKey(newPassword)
    const redis = db.createRedisClient()
    redis.publish(
      'update-pass',
      JSON.stringify({
        username,
        oldKey,
        newKey
      })
    )
  }
}
