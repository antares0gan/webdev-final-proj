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

function redirect(state = '', action) {
  switch (action.type) {
    case 'RECEIVE_API_TICKETS':
      return '/result'         // be used in jump from home to result, once result is load, clean it
    case 'RECEIVE_ADD_RESPONSE':
      return '/profile'        // be used in jump from detail to tickets, once tickets is load, clean it
    case 'CLEAN_REDIRECT':
      return ''
  }
  return state
}

function refresh(state = false, action) {
  return action.type === 'RECEIVE_DELETE_RESPONSE';
}

function selectTicket(state = {
    depCode: "",
    arrCode: "",
    depTime: "",
    arrTime: "",
    depAirport: "",
    arrAirport: "",
    flightNumber: "",
    aircraft: "",
    date: "",
    price: ""
  }, action) {
  switch (action.type) {
    case 'SELECT_TICKET':
      return action.ticket
    case 'CLEAN_TICKET':
      return {
        depCode: "",
        arrCode: "",
        depTime: "",
        arrTime: "",
        depAirport: "",
        arrAirport: "",
        flightNumber: "",
        aircraft: "",
        date: "",
        price: ""
      };
  }
  return state
}

function count(state = 0, action) {
  switch (action.type) {
    case "RECEIVE_API_TICKETS":
    case "RECEIVE_DEP":
    case "RECEIVE_ARR":
      return state + 1;
    case "CLEAR_COUNT":
      return 0;
    default:
      return state;
  }
}

function city(state = {dep:"", arr:""}, action) {
  switch (action.type) {
    case "RECEIVE_DEP":
      return Object.assign({}, state, {dep: action.city});
    case "RECEIVE_ARR":
      return Object.assign({}, state, {arr: action.city});
    default:
      return state;
  }
}

export default combineReducers({
  inFlight,
  userTickets,
  apiTickets,
  isError,
  selectTicket,
  redirect,
  refresh,
  count,
  city
});