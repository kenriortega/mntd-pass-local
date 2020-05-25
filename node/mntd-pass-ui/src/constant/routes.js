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
  SIGNUP: {
    path: '/signup',
    name: 'signup'
  },
  PROFILE: {
    path: '/profile',
    name: 'profile'
  },
  ERROR404: {
    path: '*',
    name: 'notFound404'
  }
}

export default ROUTES
