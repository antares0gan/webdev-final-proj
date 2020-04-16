import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addUserTicket } from '../actions/ticket.action';
import Loader from '../components/navbar.component';
import CustomizedNavbar from '../components/navbar.component';
import '../../public/style.css';

class TicketDetail extends React.Component {

  clickHandler() {
    this.props.addTicket(this.props.ticket);
    // once it fires, it should turn inflight to true, trigger rerender Loader
    // then when response come back, redirect changes, trigger rerender to Redirect
    // though redirect to profile will check getlogged in first, but we can't add ticket without
    // logged in, so it will pass anyway
  }

  render() {
    if (this.props.redirect) {
      return (<Redirect to={this.props.redirect}/>)
    }
    if (this.props.loading) {
      return <Loader />
    }
    let error;
    if (this.props.error) {
      error = this.props.error;
      toast("Oops, something happened");
      return (
        <div><Redirect to={'/home'}/></div>
      )
    }
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <ToastContainer hideProgressBar position="bottom-center" autoClose={3000}/>
        <h1 class="display-4" id="result-title">Trip details</h1>
        <div class="card mb-3" id="ticket-detail">
          <div class="card-body">
            <div class="card-header">{this.props.ticket.flightNumber}</div>
            <br></br>
            <div class="card-title">
              <h5 class="col-md-3" id="ticket-title-left">{this.props.ticket.depAirport}</h5>
              <div class="col-md-3" id="ticket-title-left"><i class="fas fa-arrow-right"></i></div>
              <h5 class="col-md-3" id="ticket-title-left">{this.props.ticket.arrAirport}</h5>
              <h5 class="col-md-3" id="ticket-title-right">{this.props.ticket.price}</h5>
            </div>  
            <p class="card-text">
              <div class="col-md-3" id="ticket-title-left">{this.props.ticket.depTime}</div>
              <div class="col-md-3" id="ticket-title-left"></div>
              <div class="col-md-3" id="ticket-title-left">{this.props.ticket.arrTime}</div>
              <div class="col-md-3" id="ticket-title-right">{this.props.ticket.date}</div>
            </p>
            <p class="card-text">
              <small id="craft-name">
                aircraft: {this.props.ticket.aircraft}
              </small>
            </p>
            <div id="purchase-button">
              <button type="button" class="btn btn-warning" onClick={() => this.clickHandler()}>Purchase</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTicket: (ticket) => dispatch(addUserTicket(ticket))
  }
}

function mapStateToProps(state) {
  return {
    ticket: state.ticket.selectTicket,
    loading: state.ticket.inFlight,
    error: state.ticket.isError,
    redirect: state.ticket.redirect
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail);