import api from "./api"
import TokenService from './TokenService'

const AuthService = {

  login: async (props: object) => {
    const response = await api.post('auth/login', props)
    TokenService.set(response.data.token)
    return response.data
  },

  logout: async (props: object) => {
    const response = await api.post('auth/logout', props)
    TokenService.remove()
    return response.data
  },
}

export default AuthService