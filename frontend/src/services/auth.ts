
export const setToken = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}

export const setID = (id: string) => {
  localStorage.setItem('ID', id)
}

export const getID = () => {
  return localStorage.getItem('ID')
}

export const removeID = () => {
  localStorage.removeItem('ID')
}