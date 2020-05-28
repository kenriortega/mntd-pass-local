import Vue from 'vue'
import VueRouter from 'vue-router'
import { UtilsService } from '@/services/'
import ROUTES from '@/constant/routes'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import notFound404 from '@/views/notFound404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: ROUTES.ERROR404.path,
    name: ROUTES.ERROR404.name,
    component: notFound404
  },
  {
    path: ROUTES.LOGIN.path,
    name: ROUTES.LOGIN.name,
    component: Login
  },
  {
    path: ROUTES.SIGNUP.path,
    name: ROUTES.SIGNUP.name,
    component: Signup
  },

  {
    path: ROUTES.SECRETS.path,
    name: ROUTES.SECRETS.name,

    component: () => import('@/views/Secrets.vue'),
    beforeEnter: (to, from, next) => {
      let isAuthenticated = UtilsService.getItemStorage('user')

      if (to.name !== ROUTES.LOGIN.name && !isAuthenticated)
        next({ name: ROUTES.LOGIN.name })
      else next()
    }
  },
  {
    path: ROUTES.PROFILE.path,
    name: ROUTES.PROFILE.name,

    component: () => import('@/views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      let isAuthenticated = UtilsService.getItemStorage('user')

      if (to.name !== ROUTES.LOGIN.name && !isAuthenticated)
        next({ name: ROUTES.LOGIN.name })
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
