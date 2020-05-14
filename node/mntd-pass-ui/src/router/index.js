import Vue from 'vue'
import VueRouter from 'vue-router'
import ROUTES from '@/constant/routes'
import Login from '@/views/Login.vue'
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
    path: ROUTES.SECRETS.path,
    name: ROUTES.SECRETS.name,
    // route level code-splitting
    // this generates a separate chunk (secrets.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Secrets.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
