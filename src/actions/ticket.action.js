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

function receiveDep(city) {
  return {
    type: "RECEIVE_DEP",
    city
  }
}

function receiveArr(city) {
  return {
    type: "RECEIVE_ARR",
    city
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

export function cleanCount() {
  return {
    type: "CLEAR_COUNT"
  }
}

export function getAPITickets(dep, arr) {
  return function (dispatch) {
    dispatch(inFlight()); // send request
    return Axios.get(`https://aviation-edge.com/v2/public/routes?key=05ef93-c88973&departureIata=${dep}&arrivalIata=${arr}&limit=20`)
      .then(
        function(response) {
          let raw = response.data;
          let result = [];
          if (typeof(raw) !== "undefined") {
            for (let i = 0; i < raw.length; i++) {
              if (raw[i].departureTime && raw[i].arrivalTime) {
                result.push(
                  {
                    depTime : raw[i].departureTime,
                    arrTime : raw[i].arrivalTime,
                    depCode : raw[i].departureIata,
                    arrCode : raw[i].arrivalIata,
                    flightNumber : "GH" + raw[i].flightNumber,
                    aircraft: "TBD"
                  }
                )
              }
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

export function fetchDep(iataCode) {
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.get(`https://aviation-edge.com/v2/public/airportDatabase?key=05ef93-c88973&codeIataAirport=${iataCode}`)
      .then(response => {
        let raw = response.data;
        dispatch(receiveDep(raw[0].nameAirport))
      },
      error => dispatch(receiveError()));
  }
}

export function fetchArr(iataCode) {
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.get(`https://aviation-edge.com/v2/public/airportDatabase?key=05ef93-c88973&codeIataAirport=${iataCode}`)
      .then(response => {
        let raw = response.data;
        dispatch(receiveArr(raw[0].nameAirport))
      },
      error => dispatch(receiveError()));
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