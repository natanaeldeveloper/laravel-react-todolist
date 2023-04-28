const TokenService = {

  set(token: string) {
    localStorage.setItem('TOKEN', token)
  },

  get() {
    return localStorage.getItem('TOKEN')
  },

  authenticated() {
    return localStorage.getItem('TOKEN') ? true : false
  },

  remove() {
    localStorage.removeItem('TOKEN')
  }
}

export default TokenService