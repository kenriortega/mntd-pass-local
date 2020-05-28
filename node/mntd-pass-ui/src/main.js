import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.scss'
import '@/assets/css/all.min.css'
import VTooltip from 'v-tooltip'
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
Vue.use(VTooltip)
Vue.config.productionTip = false
export const bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
