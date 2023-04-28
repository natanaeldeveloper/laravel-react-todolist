import api from "./api"
import TokenService from './TokenService'

const UserService = {

  register: async (props: object) => {
    const response = await api.post('users', props)
    TokenService.set(response.data.token)
    return response.data
  },
}

export default UserService