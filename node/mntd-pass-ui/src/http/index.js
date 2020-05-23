import Axios from 'axios'
import Vue from 'vue'
// import { UtilsService } from '@/services/'
const instance = Axios.create({
  baseURL: 'http://localhost:8080/'
})

Vue.prototype.$http = instance

instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['Content-Type'] = 'application/json'

export default instance
