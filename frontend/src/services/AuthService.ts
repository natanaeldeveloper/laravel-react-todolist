import api from "./api"
import { removeToken, setToken } from './auth'

const AuthService = {

  register: async (props: object) => {
    const response = await api.post('auth/register', props)
    setToken(response.data.token)
    return response.data
  },

  login: async (props: object) => {
    const response = await api.post('auth/login', props)
    setToken(response.data.token)
    return response.data
  },

  logout: async () => {
    try {
      const response = await api.post('auth/logout', {})
      return response.data
    } finally {
      removeToken()
    }
  },
}

export default AuthService