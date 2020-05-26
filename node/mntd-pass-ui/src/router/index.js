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
    // route level code-splitting
    // this generates a separate chunk (secrets.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Secrets.vue')
  },
  {
    path: ROUTES.PROFILE.path,
    name: ROUTES.PROFILE.name,
    // route level code-splitting
    // this generates a separate chunk (secrets.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [ROUTES.LOGIN.path]
  const authRequired = !publicPages.includes(to.path)
  let user = UtilsService.getItemStorage('user')
  let loggedIn = false
  if (user) {
    loggedIn = true
  } else {
    loggedIn = false
  }

  if (loggedIn && to.path == ROUTES.LOGIN.path) {
    return next(ROUTES.SECRETS.path)
  } else if (authRequired && !loggedIn) {
    return next(ROUTES.LOGIN.path)
  }

  // TODO: Check role for acces to admin panel
  // if (loggedIn) {
  //   try {
  //     const authorizedRole = to.meta.roles.includes(user.role)
  //     console.log(authorizedRole)
  //     if (to.path == ROUTES.LOGIN.path) {
  //       return next(ROUTES.SECRETS.path)
  //     }

  //     if (!authorizedRole) {
  //       console.log('Unauthorized way to access Route')
  //       return next(ROUTES.SECRETS.path)
  //     }
  //   } catch (error) {
  //     return next(ROUTES.SECRETS.path)
  //   }
  // }

  next()
})

export default router
