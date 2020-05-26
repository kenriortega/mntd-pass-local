import axios from '@/http'

import { API_ROUTES } from '@/constant/apiRoutes.js'

class AuthService {
  async auth(username, password) {
    let res = await axios.post(API_ROUTES.AUTH, {
      username,
      password
    })

    return res
  }
}

export default new AuthService()
