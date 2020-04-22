export default function loginDisplay(state = {username: "", redirect: false}, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {username: action.username, redirect: false};
    case 'LOG_OUT':
      return {username: "", redirect: true};
    case 'ERASE_REDIRECT':
      return Object.assign({}, state, {redirect: false});
    default:
      return state;
  }
}