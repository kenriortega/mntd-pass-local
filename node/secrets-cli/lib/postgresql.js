'use strict'

const { Client } = require('pg')
const {
  hashPassword,
  comparePassword,
  generateRandomKey,
  encrypt,
  generateKey,
  decrypt
} = require('./crypto')

const dbURL = process.env.DB_URL

const client = new Client({
  connectionString: dbURL
})

const queries = {
  tableUsers: `
          CREATE TABLE IF NOT EXISTS users (
              username text PRIMARY KEY,
              password text NOT NULL,
              ramdomkey text NOT NULL
          );
      `,
  tableSecrets: `
          CREATE TABLE IF NOT EXISTS secrets (
              username  text REFERENCES users (username),
              name  text NOT NULL,
              value text NOT NULL,
              PRIMARY KEY (username, name)
          );
      `,
  stmtCreateUser: 'INSERT INTO users VALUES ($1,$2,$3)',
  stmtListUsers: 'SELECT username as user from users',
  stmtCreateSecrets: 'INSERT INTO secrets VALUES ($1,$2,$3)',
  stmtListSecrets: 'SELECT name FROM secrets WHERE username = $1',
  stmtGetSecret: `SELECT name,value FROM secrets WHERE username = $1 AND name = $2`,
  stmtUpdateSecret: `UPDATE secrets SET value = $3 WHERE username = $1 AND name = $2`,
  stmtDeleteSecret: `DELETE FROM secrets WHERE username = $1 AND name = $2`,
  stmtGetAuthenticatedUser: `SELECT username,password,ramdomkey from users WHERE username = $1`
}

async function createDb() {
  await client.connect()
  await client.query(queries.tableUsers)
  await client.query(queries.tableSecrets)

  return {
    client,
    createUser,
    listUsers,
    createSecret,
    listSecrets,
    getSecret,
    updateSecret,
    deleteSecret,
    authenticate
  }
}
async function authenticate(username, password) {
  const user = await getAuthenticatedUser(username, password)
  return user !== null
}
async function getAuthenticatedUser(username, password) {
  const res = await client.query(queries.stmtGetAuthenticatedUser, [username])
  if (!res || !res.rows || !res.rows[0]) return false
  const user = res.rows[0]
  const hashed = user.password
  delete user.password
  if (comparePassword(password, hashed)) {
    return user
  }
  return null
}
async function createUser(username, password) {
  await client.query(queries.stmtCreateUser, [
    username,
    await hashPassword(password),
    generateRandomKey()
  ])
  await client.end()
}
async function listUsers() {
  const res = await client.query(queries.stmtListUsers)
  await client.end()

  return {
    count: res.rowCount,
    users: res.rows
  }
}

async function createSecret(username, pass, name, value) {
  const user = await getAuthenticatedUser(username, pass)
  if (!user) return

  const secretKey = generateKey(pass)
  const randomKey = user.ramdomkey
  const encrypted = encrypt(value, secretKey, randomKey)
  await client.query(queries.stmtCreateSecrets, [username, name, encrypted])
  await client.end()
}
async function listSecrets(user) {
  const res = await client.query(queries.stmtListSecrets, [user])
  await client.end()
  return res.rows
}
async function getSecret(username, pass, name) {
  const res = await client.query(queries.stmtGetSecret, [username, name])

  const user = await getAuthenticatedUser(username, pass)
  if (!user) return

  if (!res.rows.length > 0) return
  const secret = res.rows[0]

  const secretKey = generateKey(pass)
  const randomKey = user.ramdomkey
  const decrypted = decrypt(secret.value, secretKey, randomKey)

  secret.value = decrypted
  await client.end()
  return secret
}

async function updateSecret(username, pass, name, value) {
  const user = await getAuthenticatedUser(username, pass)
  if (!user) return

  const secretKey = generateKey(pass)
  const randomKey = user.ramdomkey
  const encrypted = encrypt(value, secretKey, randomKey)
  await client.query(queries.stmtUpdateSecret, [username, name, encrypted])
  await client.end()
}
async function deleteSecret(username, name) {
  await client.query(queries.stmtDeleteSecret, [username, name])
  await client.end()
}
module.exports = {
  createDb
}
