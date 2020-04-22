export function setUsername(username) {
  return {
    type: "LOGGED_IN",
    username: username
  }
}

export function logout() {
  return {
    type: "LOG_OUT"
  }
}

export function clean() {
  return {
    type: "ERASE_REDIRECT"
  }
}