import axios from '@/http'

import { API_ROUTES } from '@/constant/apiRoutes.js'
class UserService {
  async signUp(username, password, confirmPassword, role = 'basic') {
    console.log(username, password, confirmPassword, role)
    let res = await axios.post(API_ROUTES.CREATE_USER, {
      username,
      password
    })
    return res
  }
}

export default new UserService()
