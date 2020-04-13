import Axios from 'axios'

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

export function getUserTickets(username) {
  return function(dispatch) {
    dispatch(inFlight());
    return Axios.get(`/api/user/getTickets/`, {username})
      .then(response => dispatch(receiveUserTickets(response.data.tickets)),
        error => {
          console.log('An error occurred.', error);
          dispatch(receiveResponse());
        }
      );
  }
}

export function getAPITickets(dep, arr) {
  return function (dispatch) {
    dispatch(inFlight()); // send request
    return Axios.get(`http://api.aviationstack.com/v1/flights?access_key=${process.env.REACT_APP_API_KEY}&dep_iata=${dep}&arr_iata=${arr}`)
      .then(response => {
        console.log(response);
        dispatch(receiveAPITickets(response.data)) // send response
      },
      error => {
        console.log('An error occurred.', error);
        dispatch(receiveResponse());
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
        dispatch(receiveResponse());   // send error
       }
    ); 
  }
}