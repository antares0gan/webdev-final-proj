import Axios from 'axios';

function receiveAPITickets(tickets) {
  return {
    type: "RECEIVE_API_TICKETS",
    tickets
  }
}

function receiveUserTickets(tickets) {
  return {
    type: "RECEIVE_USER_TICKETS",
    tickets
  }
}

function inFlight() {
  return {
    type: "REQUEST_INFLIGHT"
  }
}

function receiveAddResponse() {
  return {
    type: "RECEIVE_ADD_RESPONSE"
  }
}

function receiveDeleteResponse() {
  return {
    type: "RECEIVE_DELETE_RESPONSE"
  }
}

function receiveError() {
  return {
    type: "RECEIVE_ERROR"
  }
}

export function chooseTicket(ticket) {
  return {
    type: "SELECT_TICKET",
    ticket
  }
}

export function cleanTicket() {
  return {
    type: "CLEAN_TICKET"
  }
}

export function cleanRedirect() {
  return {
    type: "CLEAN_REDIRECT"
  }
}

export function getAPITickets(dep, arr) {
  return function (dispatch) {
    dispatch(inFlight()); // send request
    return Axios.get(`http://api.aviationstack.com/v1/flights?access_key=${process.env.REACT_APP_API_KEY}&dep_iata=${dep}&arr_iata=${arr}`)
      .then(
        function(response) {
          let raw = response.data.data;
          let result = [];
          if (typeof(raw) !== "undefined") {
            for (let i = 0; i < raw.length; i++) {
              let craft = "TBD";
              if (raw[i].aircraft !== null) {
                craft = raw[i].aircraft.iata;
              }
              result.push(
                {
                  depTime : raw[i].departure.scheduled.split("+")[0],
                  arrTime : raw[i].arrival.scheduled.split("+")[0],
                  depCode : raw[i].departure.iata,
                  arrCode : raw[i].arrival.iata,
                  depLocation : raw[i].departure.airport,
                  arrLocation : raw[i].arrival.airport,
                  flightNumber : "GH" + raw[i].flight.number,
                  aircraft: craft
                }
              )
            }
          }
          dispatch(receiveAPITickets(result)); // send response
        },
        error => {
          console.log('An error occurred.', error);
          dispatch(receiveError());
        }
      );
  }
}

// use when loading tickets page, we call this on tickets page mount
// if it's loading, show loading then
export function getUserTickets() {   // no need username in body anymore
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.get(`/api/user/getTickets/`)
      .then(
        response => dispatch(receiveUserTickets(response.data)),
        error => {
          console.log('An error occurred.', error);
          dispatch(receiveError());
        }
      );
  }
}

// the only entrance of this method is in detail page, we call this, wait till it's done
// then do the redirect, response is not useful but only to change redirect response
//
// original idea is to call fetch list after first then, it's async and async can do wrong
export function addUserTicket(ticket) {    // only need ticket in body now
  return function(dispatch) {
    dispatch(inFlight()); // send request
    return Axios.post('/api/user/addTicket/', {ticket})
      .then(response => {  // no use of response
        dispatch(receiveAddResponse()) 
      }, 
      error => {
        console.log('An error occurred.', error);
        dispatch(receiveError());   // send error
      }
    ); 
  }
}

// as the only delete is after we are in tickets page, we can refresh content in frontend
// as same time as send delete request
export function deleteUserTicket(ticketId) {    // only need ticket id in body now
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.delete(`api/user/deleteTicket/${ticketId}`)
      .then(response => {
        dispatch(receiveDeleteResponse()) // no use of response, just fire action to change inFlight back
      },
      error => {
        console.log('An error occurred.', error);
        dispatch(receiveError());   // send error
      }
    );
  }
}