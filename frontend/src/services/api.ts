import axios from 'axios'
import TokenService from './TokenService'

const USER_TOKEN = TokenService.get()

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Authorization': `Bearer ${USER_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

export default api