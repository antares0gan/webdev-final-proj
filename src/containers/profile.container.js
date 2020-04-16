import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUserTickets, cleanRedirect } from '../actions/ticket.action';
import Loader from '../components/navbar.component';
import CustomizedNavbar from '../components/navbar.component';
import UserTicketItem from '../components/largeItem.component';
import '../../public/style.css';


class UserProfile extends React.Component {

  componentDidMount() {
    // when load, get list data
    // also to clean redirect
    this.props.cleanRedirect();
    this.props.getTickets();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.refresh) {
      this.props.getTickets();
    }
  }

  populateList() {
    let res = []
    for (let i=0; i<this.props.tickets.length; i++) {
      res.push(<UserTicketItem info={this.props.tickets[i]} />)
    }
    if (res.length === 0) {
      return (
      <div class="card" id="no-result">
        <div class="card-body">
          You have no upcoming trips.
        </div>
      </div>)
    }
    return res;
  }

  render() {
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
        <div class="list-group">
          <h1 class="display-4" id="user-result-title">Upcoming trips</h1>
          {this.populateList()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTickets: () => dispatch(getUserTickets()),
    cleanRedirect: () => dispatch(cleanRedirect())
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.ticket.userTickets,
    loading: state.ticket.inFlight,
    error: state.ticket.isError,
    redirect: state.ticket.redirect,
    refresh: state.ticket.refresh
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);