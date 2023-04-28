const TokenService = {

  set(token: string) {
    localStorage.setItem('USER_TOKEN', token)
  },

  get() {
    return localStorage.getItem('USER_TOKEN')
  },

  remove() {
    localStorage.removeItem('USER_TOKEN')
  }
}

export default TokenService