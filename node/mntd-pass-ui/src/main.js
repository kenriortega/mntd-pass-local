import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.scss'
import '@/assets/css/all.min.css'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.config.productionTip = false
export const bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
