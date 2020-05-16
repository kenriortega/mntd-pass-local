'use strict'

const { userServices } = require('@mntd/services')
module.exports = async function (fastify, options) {
  fastify.addSchema({
    $id: 'publicUser',
    type: 'object',
    properties: {
      username: { type: 'string' },
      fullName: { type: 'string' },
      createdAt: { type: 'string' }
    }
  })
  fastify.addSchema({
    $id: 'users',
    type: 'array',
    items: { $ref: 'publicUser#' }
  })
  fastify.addSchema({
    $id: 'result',
    type: 'object',
    properties: {
      count: { type: 'integer' },
      data: { $ref: 'users#' }
    }
  })
  fastify.get(
    '/users',
    {
      preValidation: fastify.auth([fastify.validateJWT]),

      schema: {
        response: {
          200: 'result#'
        }
      }
    },
    async (req, reply) => {
      // let { user } = req.user
      // console.log(user)
      const users = await userServices.listUsers()
      return {
        count: users.count,
        data: users.rows
      }
    }
  )

  fastify.addSchema({
    $id: 'createUser',
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      fullName: { type: 'string' }
    },
    require: ['username', 'password']
  })
  fastify.post(
    '/users',
    {
      // preValidation: fastify.auth([fastify.validateJWT]),
      schema: {
        body: 'createUser#',
        response: {
          201: 'publicUser#'
        }
      }
    },
    async (req, reply) => {
      const { username, password, fullName } = req.body
      reply.code(201)
      return userServices.createUser(username, password, fullName)
    }
  )

  fastify.put(
    '/users',
    {
      preValidation: fastify.auth([fastify.validateJWT])
    },
    async (request, reply) => {
      const {
        user: { username }
      } = request.user
      const { oldPassword, newPassword } = request.body
      await userServices.changePassword(username, oldPassword, newPassword)
      reply.code(202)
      return { status: 'in process' }
    }
  )
}
