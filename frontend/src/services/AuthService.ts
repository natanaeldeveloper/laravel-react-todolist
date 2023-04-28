import api from "./api"
import TokenService from './TokenService'

const AuthService = {

  login: async (props: object) => {
    const response = await api.post('auth/login', props)
    TokenService.set(response.data.token)
    return response.data
  },

  logout: async () => {
    const response = await api.post('auth/logout')
    TokenService.remove()
    return response.data
  },
}

export default AuthService