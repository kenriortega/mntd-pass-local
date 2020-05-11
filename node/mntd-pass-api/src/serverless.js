'use strict'

module.exports = async function (fastify, options) {
  fastify
    .get('/', async (request, replay) => {
      return {
        greetings: 'Node.js En vivo'
      }
    })
    .post('/users', (request, replay) => {
      console.log(request.body)
      replay.send({
        users: [1, 2, 3, 4]
      })
    })
}
