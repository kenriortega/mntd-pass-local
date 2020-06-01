import axios from '@/http'

import { API_ROUTES } from '@/constant/apiRoutes.js'
class UserService {
  async signUp(username, password) {
    let res = await axios.post(API_ROUTES.CREATE_USER, {
      username,
      password
    })
    return res
  }
  async changePassword(oldPassword, newPassword, token) {
    let res = await axios.put(
      API_ROUTES.UPDATE_USER,
      {
        oldPassword,
        newPassword
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res
  }
}

export default new UserService()
