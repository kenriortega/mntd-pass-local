'use strict'
const { authenticate } = require('@mntd/auth')

const fp = require('fastify-plugin')

const messages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Autorization header is missing!',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  // for the below message you can pass a sync function that must return a string as shown or a string
  authorizationTokenInvalid: err => {
    return `Authorization token is invalid: ${err.message}`
  }
}
async function authentication(fastify, options) {
  fastify.addSchema({
    $id: 'tokenUser',
    type: 'object',
    properties: {
      username: { type: 'string' },
      fullName: { type: 'string' },
      role: { type: 'string' },
      token: { type: 'string' },
      createdAt: { type: 'string' }
    }
  })
  fastify.addSchema({
    $id: 'authUser',
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    },
    require: ['username', 'password']
  })
  fastify
    .register(require('fastify-jwt'), {
      secret: process.env.SECRET_TOKEN || 'secretdev',
      messages,
      sign: {
        expiresIn: 3000
      }
    })
    .register(require('fastify-auth'))
    .decorate('validateJWT', async (req, replay) => {
      try {
        await req.jwtVerify()
      } catch (err) {
        replay.send(err)
      }
    })
    .decorate('validateUserPassword', async (req, reply) => {
      const { username, password } = req.body
      const user = await authenticate(username, password)
      if (user) {
        req.user = {
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt
        }
      } else {
        reply.code(401).send(new Error('Forbidden'))
      }
    })
    .after(() => {
      fastify.post(
        '/auth',
        {
          preValidation: fastify.auth([fastify.validateUserPassword]),
          schema: {
            body: 'authUser#',
            response: {
              200: 'tokenUser#'
            }
          }
        },
        async (req, reply) => {
          const user = req.user
          const token = fastify.jwt.sign({ user })
          user.token = token
          return user
        }
      )
    })
}

module.exports = fp(authentication)
