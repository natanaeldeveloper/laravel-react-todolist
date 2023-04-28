import axios from 'axios'
import TokenService from './TokenService'

const TOKEN = TokenService.get()

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
})

export default api