import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.scss'
import '@/assets/css/all.min.css'

// externals
import VTooltip from 'v-tooltip'
import Toaster from 'v-toaster'
// import 'v-toaster/dist/v-toaster.css'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'
localize(es)
Object.keys(rules).forEach(rule => extend(rule, rules[rule]))
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, { timeout: 5000 })
Vue.use(VTooltip)
Vue.config.productionTip = false

// apps
export const bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
