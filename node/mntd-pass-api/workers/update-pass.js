'use strict'
const { createRedisClient } = require('@mntd/db')
const { secretServices } = require('@mntd/services')

const subscriber = createRedisClient()
subscriber.subscribe('update-pass')
subscriber.on('message', (topic, data) => {
  switch (topic) {
    case 'update-pass':
      try {
        const payload = JSON.parse(data)
        const { username, oldKey, newKey } = payload
        secretServices.updateAllSecret(username, oldKey, newKey)
      } catch (err) {
        throw new Error('Failed to update all password')
      }
      break

    default:
      break
  }
})
