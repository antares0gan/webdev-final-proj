import React from 'react';
import { connect } from 'react-redux';

import { cleanRedirect } from '../actions/ticket.action';
import CustomizedNavbar from '../components/navbar.component';
import TicketItem from '../components/item.component';
import '../../public/style.css';

class SearchResult extends React.Component {

  componentDidMount() {
    this.props.clean();
  }

  populateList() {
    let res = []
    for (let i=0; i<this.props.tickets.length; i++) {
      let info = this.props.tickets[i];
      info.depLocation = this.props.depCity;
      info.arrLocation = this.props.arrCity;
      res.push(<TicketItem info={info} />)
    }
    if (res.length === 0) {
      return (
        <div class="card" id="no-result">
          <div class="card-body">
            There is no available flights.
          </div>
        </div>
      )
    }
    return res;
  }

  render() {
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <div class="list-group">
          <h1 class="display-4" id="result-title">Available flights</h1>
          {this.populateList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    tickets: state.ticket.apiTickets,
    depCity: state.ticket.city.dep,
    arrCity: state.ticket.city.arr
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    clean: () => dispatch(cleanRedirect()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchResult);