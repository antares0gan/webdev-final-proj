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

function receiveResponse() {
  return {
    type: "RECEIVE_RESPONSE"
  }
}

function receiveError() {
  return {
    type: "RECEIVE_ERROR"
  }
}

export function getUserTickets(username) {
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.get(`/api/user/getTickets/`, {username})
      .then(response => dispatch(receiveUserTickets(response.data.tickets)),
        error => {
          console.log('An error occurred.', error);
          dispatch(receiveError());
        }
      );
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
              console.log(raw[i]);
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

export function updateUserTickets(username, tickets) {
  return function(dispatch) {
    dispatch(inFlight()); // send request
    return Axios.put('/api/user/updateTickets/', {username, tickets})
      .then(response => dispatch(receiveResponse()), // send response, only need to change inflight status back
      error => {
        console.log('An error occurred.', error);
        dispatch(receiveError());   // send error
       }
    ); 
  }
}