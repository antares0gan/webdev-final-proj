import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

import { getAPITickets } from '../actions/ticket.action';
import Loader from '../components/loading.component';
import CustomizedNavbar from '../components/navbar.component';
import TicketItem from '../components/item.component';

class SearchResult extends React.Component {

  componentDidMount() {
    let dep = this.props.dep;
    let des = this.props.des;
    this.props.fetchTickets(dep, des);
  }

  populateList() {
    let res = []
    for (let i=0; i<this.props.tickets.length; i++) {
      res.push(<TicketItem info={this.props.tickets[i]} />)
    }
    if (res.length === 0) {
      return (<h1>No results found</h1>)
    }
    return res;
  }

  render() {
    if (this.props.loading) {
      return <Loader />
    }
    if (this.props.error) {
      window.alert('Oops, something happened');
      return (
        <div><Redirect to={'/home'}/></div>
      )
    }
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <div class="list-group">
          {this.populateList()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchTickets: (dep, des) => dispatch(getAPITickets(dep, des))
  }
}

function mapStateToProps(state, props) {
  return {
    dep: state.setSearch.dep,
    des: state.setSearch.des,
    tickets: state.ticket.apiTickets,
    loading: state.ticket.inFlight,
    error: state.ticket.isError
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchResult);