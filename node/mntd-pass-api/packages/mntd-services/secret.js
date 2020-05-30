'use strict'

const db = require('@mntd/db')
const { getSecretKey } = require('@mntd/auth')
const { encrypt, decrypt, generateRandomKey } = require('@mntd/crypto')

module.exports = {
  /**
   * Permite crear un secret
   *
   * @param {string} username
   * @param {string} name
   * @param {string} value
   */
  async createSecret(username, name, value, category) {
    const user = await db.User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = await getSecretKey(username)
    const randomKey = user.randomKey
    const encrypted = encrypt(value, secretKey, randomKey)

    return db.Secret.create({
      username,
      name,
      value: encrypted,
      category
    })
  },

  /**
   * Lista los secrets de un usuario
   *
   * @param {string} username
   * @returns {Array<Secret>} Array<Secret>
   */
  listSecrets(username) {
    return db.Secret.findAndCountAll({ where: { username } })
  },

  /**
   * Obtiene un secreto
   *
   * @param {string} username
   * @param {string} name
   * @returns {Secret} Secret
   */
  async getSecret(username, name) {
    const user = await db.User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = await getSecretKey(username)
    const randomKey = user.randomKey
    const secret = await db.Secret.findOne({
      where: {
        username,
        name
      }
    })

    if (!secret) return false

    const decrypted = decrypt(secret.value, secretKey, randomKey)

    return {
      ...secret.toJSON(),
      ...{
        value: decrypted
      }
    }
  },

  /**
   * Update a Secret
   *
   * @param {string} username
   * @param {string} name
   * @param {string} value
   * @returns {Secret} Secret
   */
  async updateSecret(username, name, value) {
    const user = await db.User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = await getSecretKey(username)
    const randomKey = user.randomKey
    const encrypted = encrypt(value, secretKey, randomKey)

    return db.Secret.update(
      {
        value: encrypted
      },
      { where: { username, name } }
    )
  },

  /**
   * Delete a secret
   *
   * @param {string} username
   * @param {string} name
   * @returns {void}
   */
  deleteSecret(username, name) {
    return db.Secret.destroy({
      where: {
        username,
        name
      }
    })
  },
  async updateAllSecret(username, oldKey, newKey) {
    const user = await db.User.findOne({ where: { username } })
    const oldRandomKey = user.randomKey
    const newRandomKey = generateRandomKey()
    user.randomKey = newRandomKey
    await user.save()
    const secrets = await db.Secret.findAll({
      where: { username }
    })

    for (let secret of secrets) {
      //todo fix this bug
      const encryptedValue = secret.value
      const value = decrypt(encryptedValue, oldKey, oldRandomKey)
      secret.value = encrypt(value, newKey, newRandomKey)
      await secret.save()
    }
  }
}
