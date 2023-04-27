import api from "./api"

const AuthService = {
  login: async (props: object) => {
    const response = await api.post('auth/login', props)
    return response.data
  }
}

export default AuthService