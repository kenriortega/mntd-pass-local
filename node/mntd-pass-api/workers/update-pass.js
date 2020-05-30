'use strict'
require('dotenv').config()

const { createRedisClient } = require('@mntd/db')
const { secretServices } = require('@mntd/services')

const subscriber = createRedisClient()
subscriber.subscribe('update-pass')
subscriber.on('message', async (topic, data) => {
  switch (topic) {
    case 'update-pass':
      const payload = JSON.parse(data)
      const { username, oldKey, newKey } = payload
      await secretServices.updateAllSecret(username, oldKey, newKey)
      break

    default:
      break
  }
})
