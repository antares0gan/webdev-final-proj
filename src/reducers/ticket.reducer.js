import {combineReducers} from 'redux'

function inFlight(state = false, action) {
  return action.type === 'REQUEST_INFLIGHT';
}

function isError(state = false, action) {
  return action.type === 'RECEIVE_ERROR';
}

function userTickets(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_USER_TICKETS':
      return action.tickets
  }
  return state;
}

function apiTickets(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_API_TICKETS':
      return action.tickets
  }
  return state
}

export default combineReducers({
  inFlight,
  userTickets,
  apiTickets,
  isError
});