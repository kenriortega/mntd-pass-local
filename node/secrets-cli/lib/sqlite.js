'use strict'

const path = require('path')
const { Database } = require('sqlite3').verbose()
const {
  hashPassword,
  comparePassword,
  generateRandomKey,
  encrypt,
  generateKey,
  decrypt
} = require('./crypto')
const client = new Database(path.join(__dirname, '..', 'secrets.db'))

const queries = {
  tableUsers: `
        CREATE TABLE IF NOT EXISTS users (
            user TEXT PRIMARY KEY,
            pass TEXT NOT NULL,
            ramdomkey text NOT NULL
        );
    `,
  tableSecrets: `
        CREATE TABLE IF NOT EXISTS secrets (
            user  TEXT,
            name  TEXT NOT NULL,
            value TEXT NOT NULL,
            PRIMARY KEY (user, name),
            FOREIGN KEY (user)
            REFERENCES users (user)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
        );
    `,
  stmtCreateUser: 'INSERT INTO users VALUES (?,?,?)',
  stmtListUsers: 'SELECT user from users',
  stmtCreateSecrets: 'INSERT INTO secrets VALUES (?,?,?)',
  stmtListSecrets: 'SELECT name FROM secrets WHERE user = ?',
  stmtGetSecret: `SELECT name,value FROM secrets WHERE user = ? AND name = ?`,
  stmtUpdateSecret: `UPDATE secrets SET value = ? WHERE user = ? AND name = ?`,
  stmtDeleteSecret: `DELETE FROM secrets WHERE user = ? AND name = ?`,
  stmtGetAuthenticatedUser: `SELECT user,pass,ramdomkey from users WHERE user = ?`
}

/**
 * createDb crea la instancia de la Base de datos en SQLite3
 *
 * @returns
 */
async function createDb() {
  return new Promise((resolve, reject) => {
    client.serialize(() => {
      client.run(queries.tableUsers)
      client.run(queries.tableSecrets, err => {
        if (err) return reject(err)
        resolve({
          client,
          createUser,
          listUsers,
          createSecret,
          listSecrets,
          getSecret,
          updateSecret,
          deleteSecret,
          authenticate
        })
      })
    })
  })
}

async function authenticate(username, password) {
  const user = await getAuthenticatedUser(username, password)
  return user !== null
}
async function getAuthenticatedUser(username, pass) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtGetAuthenticatedUser)
    stmt.get(username, (err, row) => {
      if (err) return reject(err)

      const user = row
      const hashed = user.pass
      delete user.pass
      comparePassword(pass, hashed)
        .then(result => {
          if (result) {
            resolve(user)
          } else {
            resolve(null)
          }
        })
        .catch(err => console.log(err))
    })
  })
}
async function createUser(user, pass) {
  const securePass = await hashPassword(pass)
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtCreateUser)
    stmt.run(user, securePass, generateRandomKey())
    stmt.finalize(err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

async function listUsers() {
  return new Promise((resolve, reject) => {
    const users = []
    client.each(
      queries.stmtListUsers,
      (err, row) => {
        if (err) return reject(err)
        users.push(row)
      },
      (err, count) => {
        if (err) return reject(err)
        resolve({ count, users })
      }
    )
  })
}

async function createSecret(username, pass, name, value) {
  const user = await getAuthenticatedUser(username, pass)
  if (!user) return
  const secretKey = generateKey(pass)
  const randomKey = user.ramdomkey
  const encrypted = encrypt(value, secretKey, randomKey)

  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtCreateSecrets)
    stmt.run(username, name, encrypted, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

async function listSecrets(user) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtListSecrets)
    stmt.all(user, (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}
async function getSecret(username, pass, name) {
  const user = await getAuthenticatedUser(username, pass)
  if (!user) return

  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtGetSecret)

    stmt.get(username, name, (err, row) => {
      if (err) return reject(err)
      const secret = row

      const secretKey = generateKey(pass)
      const randomKey = user.ramdomkey
      const decrypted = decrypt(secret.value, secretKey, randomKey)
      secret.value = decrypted

      resolve(secret)
    })
  })
}

async function updateSecret(username, pass, name, value) {
  const user = await getAuthenticatedUser(username, pass)
  if (!user) return
  const secretKey = generateKey(pass)
  const randomKey = user.ramdomkey
  const encrypted = encrypt(value, secretKey, randomKey)
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtUpdateSecret)

    stmt.run(encrypted, username, name, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
async function deleteSecret(user, name) {
  return new Promise((resolve, reject) => {
    const stmt = client.prepare(queries.stmtDeleteSecret)
    stmt.run(user, name, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
module.exports = {
  createDb
}
