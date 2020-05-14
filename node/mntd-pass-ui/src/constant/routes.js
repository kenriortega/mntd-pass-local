'use strict'

const ROUTES = {
  SECRETS: {
    path: '/secrets',
    name: 'secrets'
  },
  LOGIN: {
    path: '/',
    name: 'login'
  },
  ERROR404: {
    path: '*',
    name: 'notFound404'
  }
}

export default ROUTES
