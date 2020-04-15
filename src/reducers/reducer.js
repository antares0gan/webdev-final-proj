import ticketReducers from "./ticket.reducer";
import userReducer from "./user.reducer";
import setSearch from "./search.reducer";
import {combineReducers} from 'redux'

export default combineReducers({
  ticket: ticketReducers,
  user: userReducer,
  setSearch
})