import React from 'react';
import { connect } from 'react-redux';

import { deleteUserTicket } from '../actions/ticket.action';
import '../../public/style.css';

class UserTicketItem extends React.Component {
  
  clickHandler() {
    this.props.deleteTicket(this.props.info._id); // this goes to db, will change inflight and affect tickets page
  }                                               // when response comes back, it triggers component update and retrive new list in tickets page

  render() {
    return (
      <div class="card mb-3" id="ticket-detail">
        <div class="card-body">
          <div class="card-header">{this.props.info.flightNumber}</div>
          <br></br>
          <div class="card-title">
            <h5 class="col-md-3" id="ticket-title-left">{this.props.info.depAirport}</h5>
            <div class="col-md-3" id="ticket-title-left"><i class="fas fa-arrow-right"></i></div>
            <h5 class="col-md-3" id="ticket-title-left">{this.props.info.arrAirport}</h5>
          </div>  
          <p class="card-text">
            <div class="col-md-3" id="ticket-title-left">{this.props.info.depTime}</div>
            <div class="col-md-3" id="ticket-title-left"></div>
            <div class="col-md-3" id="ticket-title-left">{this.props.info.arrTime}</div>
            <div class="col-md-3" id="ticket-title-right">{this.props.info.date}</div>
          </p>
          <p class="card-text">
            <small id="craft-name">
              aircraft: {this.props.info.aircraft}
            </small>
          </p>
          <div id="purchase-button">
            <button type="button" class="btn btn-warning" onClick={() => this.clickHandler()}>Cancel trip</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTicket: (ticketId) => dispatch(deleteUserTicket(ticketId))
  }
}

export default connect(null, mapDispatchToProps)(UserTicketItem);