const userInfoKey = 'User-Info'

export function getUserInfo () {
  return JSON.parse(localStorage.getItem(userInfoKey))
}

export function setUserInfo (user) {
  return localStorage.setItem(userInfoKey, JSON.stringify(user))
}
export function removeUserInfo () {
  return localStorage.setItem(userInfoKey, undefined)
}
