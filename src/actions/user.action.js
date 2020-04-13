import Axios from 'axios'

function loginAttempt() {
  return {
    type: "LOGIN_ATTEMPT"
  }
}

function loginSuccess(username, page) {
  return {
    type: "LOGIN_SUCCESS",
    target: page,
    username
  }
}

function loginFailure(error) {
  return {
    type: "LOGIN_FAILURE",
    error
  }
}

function registerAttempt() {
  return {
    type: "REGISTER_ATTEMPT"
  }
}

function registerSuccess(username, page) {
  return {
    type: "REGISTER_SUCCESS",
    target: page,
    username
  }
}

function registerFailure(error) {
  return {
    type: "REGISTER_FAILURE",
    error
  }
}


export function selectUser(username) {
  return {
    type: "SELECT_USER",
    username
  }
}

export function validate(user) {
  return  {...user,
    type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
  return {
    type: "CLEAR"
  }
}

export function login(user, page) {
  return function (dispatch) {
    dispatch(loginAttempt());
    return Axios.post('/api/user/authenticate', user)
      .then(response => dispatch(loginSuccess(response.data.username, page)),
        error => dispatch(loginFailure(error.response.data))
    );
  }
}

export function register(username, password, page) {
  return function (dispatch) {
    dispatch(registerAttempt());
    return Axios.post('/api/user/', {username, password})
      .then(response => {
        console.dir(response.data);
        dispatch(registerSuccess(response.data.username, page))
        },
        error => dispatch(registerFailure(error.response.data.message))
      );
  }
}