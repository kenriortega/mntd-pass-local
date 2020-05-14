import axios from 'axios'
import { API_ROUTES } from '../constant/apiRoutes.js'
class SecretService {
  async getSecrets(username, token) {
    let res = await axios.get(`${API_ROUTES.SECRETS}/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return res
  }

  async getValueSecret(username, name, token) {
    let res = await axios.get(`${API_ROUTES.GET_SECRET}/${username}/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return res
  }
}

export default new SecretService()
