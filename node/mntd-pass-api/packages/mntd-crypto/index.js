'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const algorithm = 'aes-256-cbc'
const saltRounds = 5

/**
 * hashPassword genera un has dado un password ingresado por parametro
 *
 * @param {string} pass
 * @returns {Promise<string>} hashBcrypt
 */
async function hashPassword(pass) {
  return bcrypt.hash(pass, saltRounds)
}

/**
 * comparePassword realiza la comparacion de password a traves de la lib bcrypt
 *
 * @param {string} pass
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(pass, hash) {
  return bcrypt.compare(pass, hash)
}

/**
 * encrypt realiza el proceso de encripcion del contenido del obtejo secret
 *
 * @param {string} data
 * @param {string} key
 * @param {string} iv
 * @returns {string} content encrypted
 */
function encrypt(data, key, iv) {
  let cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(iv, 'hex')
  )
  let encrypted = cipher.update(data)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString('hex')
}
/**
 * decrypt realiza el proceso decrypt del contenido del secret
 *
 * @param {string} data
 * @param {string} key
 * @param {string} iv
 * @returns {string} content decrypted
 */
function decrypt(data, key, iv) {
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(iv, 'hex')
  )
  let decrypted = decipher.update(Buffer.from(data, 'hex'))
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
/**
 * genera una llave random para el obejto Usuario pueda realizar su proceso de (en/de)crypt
 *
 * @returns
 */
function generateRandomKey() {
  return crypto.randomBytes(16).toString('hex')
}

/**
 * Genera la llave hash a traves del password
 *
 * @param {string} pass
 * @returns
 */
function generateKey(pass) {
  return crypto.createHash('sha256').update(pass).digest('hex')
}

module.exports = {
  hashPassword,
  comparePassword,
  encrypt,
  decrypt,
  generateRandomKey,
  generateKey
}
