'use strict'
const client = require('../models')
const {
  hashPassword,
  comparePassword,
  generateRandomKey,
  encrypt,
  generateKey,
  decrypt
} = require('./crypto')
async function createDb() {
  return {
    client,
    createUser,
    listUsers,
    authenticate,
    createSecret,
    listSecrets,
    getSecret,
    updateSecret,
    deleteSecret
  }
}
async function authenticate(username, password) {
  const user = await getAuthenticatedUser(username, password)
  return user !== null
}
async function getAuthenticatedUser(username, password) {
  try {
    const userModel = await client.User.findOne({
      where: {
        username: username
      }
    })
    const user = userModel.toJSON()
    const hashed = user.password
    delete user.password
    if (comparePassword(password, hashed)) {
      return userModel
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

async function createUser(username, password) {
  try {
    const user = client.User.build({
      username,
      password: await hashPassword(password),
      randomkey: generateRandomKey()
    })

    await user.save()
  } catch (error) {
    console.log(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}
async function listUsers() {
  try {
    let { count, rows } = await client.User.findAndCountAll()
    const users = rows.map(u => {
      return u.toJSON()
    })
    return {
      count,
      users
    }
  } catch (error) {
    console.log(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}

async function createSecret(username, pass, name, value) {
  try {
    const user = await getAuthenticatedUser(username, pass)
    if (!user) return

    const secretKey = generateKey(pass)
    const randomKey = user.toJSON().randomkey
    const encrypted = encrypt(value, secretKey, randomKey)
    const secret = client.Secret.build({
      username,
      name,
      value: encrypted
    })

    await secret.save()
  } catch (error) {
    console.log(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}
async function listSecrets(username, pass) {
  try {
    const user = await getAuthenticatedUser(username, pass)
    if (!user) return
    let { count, rows } = await client.Secret.findAndCountAll({
      where: { username }
    })
    return {
      // secrets: await user.getSecrets()
      count,
      secrets: rows
    }
  } catch (error) {
    console.log(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}
async function getSecret(username, pass, name) {
  try {
    const user = await getAuthenticatedUser(username, pass)
    if (!user) return

    const secretModel = await client.Secret.findOne({
      where: {
        username: username,
        name
      }
    })
    const secret = secretModel.toJSON()
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
    secret.value = decrypt(secret.value, secretKey, randomKey)

    return secret
  } catch (error) {
    console.log(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}
async function updateSecret(username, pass, name, value) {
  try {
    const user = await getAuthenticatedUser(username, pass)
    if (!user) return
    const secretKey = generateKey(pass)
    const randomKey = user.randomkey
    const encrypted = encrypt(value, secretKey, randomKey)
    const secretModel = await client.Secret.findOne({
      where: {
        username: username,
        name
      }
    })
    await secretModel.update({ value: encrypted })
  } catch (error) {
    console.error(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}
async function deleteSecret(username, pass, name) {
  try {
    const user = await getAuthenticatedUser(username, pass)
    if (!user) return

    const secretModel = await client.Secret.findOne({
      where: {
        username: username,
        name
      }
    })
    await secretModel.destroy()
  } catch (error) {
    console.error(error)
  } finally {
    await client.sequelize.connectionManager._onProcessExit()
  }
}

module.exports = {
  createDb
}
