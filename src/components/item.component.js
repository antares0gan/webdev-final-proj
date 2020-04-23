import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {chooseTicket} from '../actions/ticket.action';
import LogoSmall from '../../public/assets/GH-01.jpg';
import '../../public/style.css';

class TicketItem extends React.Component {

  processTime(rawTime) {
    let timeArr = rawTime.split(":");
    let res = timeArr[0] + ":" + timeArr[1];
    return res;
  }
  
  concatDepDesTime() {
    let startTime = this.processTime(this.props.info.depTime);
    let endTime = this.processTime(this.props.info.arrTime);
    return startTime + " - " + endTime;
  }
  
  concatDepDesLocation() {
    let dep = this.props.info.depLocation;
    let arr = this.props.info.arrLocation;
    return dep + " - " + arr;
  }

  concatDepDesCode() {
    let dep = this.props.info.depCode;
    let arr = this.props.info.arrCode;
    return dep + " - " + arr;
  }

  generatePrice() {
    let n = Math.floor(Math.random() * 90) + 130;
    return "$ " + n.toString();
  }
  
  render() {
    let processed = {
      depCode: this.props.info.depCode,
      arrCode: this.props.info.arrCode,
      depTime: this.processTime(this.props.info.depTime),
      arrTime: this.processTime(this.props.info.arrTime),
      depAirport: this.props.info.depLocation,
      arrAirport: this.props.info.arrLocation,
      flightNumber: this.props.info.flightNumber,
      aircraft: this.props.info.aircraft,
      date: this.props.date,
      price: this.generatePrice()
    }
    return (
      <Link to={'/detail'} onClick={() => this.props.selectTicket(processed)}>
        <div id="ticket-card" class="rounded">
          <div class="row no-gutters">
            <div class="col-md-2">
              <img src={LogoSmall} class="card-img" alt="..." />
            </div>
            <div class="col-md-3">
              <br></br>
              <h5 class="card-title" id="info-text">{this.concatDepDesTime()}</h5>
              <div class="card-text"><small class="text-muted">{this.props.info.flightNumber}</small></div>
            </div>
            <div class="col-md-5">
              <br></br>
              <h5 class="card-title" id="info-text">{this.concatDepDesLocation()}</h5>
              <div class="card-text"><small class="text-muted">{this.concatDepDesCode()}</small></div>
            </div>
            <div class="col-md-2">
              <br></br>
              <h5 class="card-title" id="info-text">{processed.price}</h5>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectTicket: (ticket) => dispatch(chooseTicket(ticket))
  }
}

function mapStateToProps(state) {
  return {
    date: state.setSearch.date
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketItem);