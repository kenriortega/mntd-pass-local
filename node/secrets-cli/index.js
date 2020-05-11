#!/usr/bin/env node
'use strict'
require('dotenv').config()
const minimist = require('minimist')
const promptly = require('promptly')

const argv = minimist(process.argv.slice(2))
const { createDb } = require('./lib')

const commands = {
  userCreate: 'users:create',
  usersList: 'users:list',
  secretCreate: 'secrets:create',
  secretsList: 'secrets:list',
  secretGet: 'secrets:get',
  secretUpdate: 'secrets:update',
  secretDelete: 'secrets:delete'
}

const promptPassword = () =>
  promptly.password('Enter your password: ', { replace: '*' })

async function main() {
  const db = await createDb(process.env.DB_TYPE)
  const command = argv._.shift()

  switch (command) {
    case commands.userCreate:
      try {
        const { user } = argv
        const pass = await promptPassword()
        await db.createUser(user, pass)
        console.log(`${user} created`)
      } catch (err) {
        console.log(err)
        throw new Error('Cannot create user')
      }
      break
    case commands.usersList:
      try {
        const results = await db.listUsers()
        console.log(`Total: ${results.count}`)
        results.users.forEach(u => {
          console.log(`\t- ${u.user || u.username}`)
        })
      } catch (err) {
        throw new Error('Cannot list users')
      }
      break
    case commands.secretCreate:
      try {
        const { user, name, value } = argv
        const pass = await promptPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')
        await db.createSecret(user, pass, name, value)
        console.log(`secret: ${name} created`)
      } catch (err) {
        throw new Error('Cannot create secrets')
      }
      break
    case commands.secretsList:
      try {
        const { user } = argv
        const pass = await promptPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')
        const results = await db.listSecrets(user, pass)
        const secrets = results.secrets
        console.log(`Total: ${results.count}`)
        secrets.forEach(s => {
          console.log(`\t- ${s.name}`)
        })
      } catch (err) {
        throw new Error('Cannot list secrets')
      }
      break
    case commands.secretGet:
      try {
        const { user, name } = argv
        const pass = await promptPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')
        const secret = await db.getSecret(user, pass, name)
        if (!secret) return console.log(`secret ${name} not found`)
        console.log(`- ${secret.name} = ${secret.value}`)
      } catch (err) {
        console.log(err)
        throw new Error('Cannot get secrets')
      }
      break
    case commands.secretUpdate:
      try {
        const { user, name, value } = argv
        const pass = await promptPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')
        await db.updateSecret(user, pass, name, value)
        console.log(`secret ${name} updated`)
      } catch (err) {
        throw new Error('Cannot update secrets')
      }
      break
    case commands.secretDelete:
      try {
        const { user, name } = argv
        const pass = await promptPassword()
        const isAuth = await db.authenticate(user, pass)
        if (!isAuth) throw new Error('Invalid user or password')
        await db.deleteSecret(user, pass, name)
        console.log(`secret ${name} deleted`)
      } catch (err) {
        throw new Error('Cannot delete secrets')
      }
      break
    default:
      console.log(`command not found: ${command}`)
  }
}

main().catch(err => console.log(err))
