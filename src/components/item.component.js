import React from 'react';

import LogoSmall from '../../public/assets/GH-01.jpg';
import '../../public/style.css';

class TicketItem extends React.Component {

  concatDepDesTime() {
    let start = new Date(this.props.info.depTime);
    let end = new Date(this.props.info.arrTime);
    let startTimeArr = start.toTimeString().split(" ")[0].split(":");
    let startTime = startTimeArr[0] + ":" + startTimeArr[1];
    let endTimeArr = end.toTimeString().split(" ")[0].split(":");
    let endTime = endTimeArr[0] + ":" + endTimeArr[1];
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
    return (
      <div id="ticket-card" class="rounded">
        <div class="row no-gutters">
          <div class="col-md-2">
            <img src={LogoSmall} class="card-img" alt="..." />
          </div>
          <div class="col-md-3">
            <br></br>
            <h5 class="card-title">{this.concatDepDesTime()}</h5>
            <div class="card-text"><small class="text-muted">{this.props.info.flightNumber}</small></div>
          </div>
          <div class="col-md-5">
            <br></br>
            <h5 class="card-title">{this.concatDepDesLocation()}</h5>
            <div class="card-text"><small class="text-muted">{this.concatDepDesCode()}</small></div>
          </div>
          <div class="col-md-2">
            <br></br>
            <h5 class="card-title">{this.generatePrice()}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default TicketItem;