import Vue from 'vue'
import VueRouter from 'vue-router'
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

// router.beforeEach((to, from, next) => {
//   // hiding search box

//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);

//   // todo: Try with jwt decoding for checking if it returns an Expired error.
//   let loggedIn = false
//   if (localStorage.getItem('token')) {
//       loggedIn = true
//   } else { loggedIn = false }

//   if (loggedIn && to.path == '/login') {
//       return next('/home')
//   } else
//       if (authRequired && !loggedIn) {
//           return next('/login');
//       }

//   // const authorizedRole = to.meta.roles.includes(store.getters.getLoggedUserRoleAlias)
//   if (loggedIn) {
//       const userObject = JSON.parse(localStorage.getItem('user'));
//       try {
//           const authorizedRole = to.meta.roles.includes(userObject.roleAlias)
//           console.log(userObject.roleAlias);
//           if (to.path == '/login') {
//               return next('/home')
//           }

//           if (!authorizedRole) {

//               console.log('Unauthorized way to access Route')
//               return next('/home')
//           }
//       } catch (error) {
//           return next('/home')

//       }

//   }

//   next();
// })

export default router
