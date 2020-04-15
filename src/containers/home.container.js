import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setDep, setDes, setDate } from '../actions/search.action';
import CustomizedNavbar from '../components/navbar.component';
import '../../public/style.css';

class HomePage extends React.Component {

  getDate() {
    let d = new Date()
    d.setDate(d.getDate() + 1);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = d.getDate();
    if (day < 10) {
      day = "0" +day;
    }
    let res = [year, month, day].join("-");
    return res;
  }

  inputValid(e) {
    const re = /[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  
  render() {
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <div id="search-box-wrapper">
          <form id="search-box" class="rounded">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputDep">Depature</label>
                <input type="text" class="form-control" id="inputDep" placeholder="JFK" minLength="3" maxLength="3" onKeyPress={event => this.inputValid(event)} onChange={e => this.props.setDep(e.target.value)}/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputDes">Destination</label>
                <input type="text" class="form-control" id="inputDes" placeholder="CKG" minLength="3" maxLength="3" onKeyPress={event => this.inputValid(event)} onChange={e => this.props.setDes(e.target.value)}/>
              </div>
            </div>
            <div class="form-group">
              <label for="inputDate">Date</label>
              <input type="date" class="form-control" id="inputDate" min={this.getDate()} onChange={e => this.props.setDate(e.target.value)} />
            </div>
            <Link class="btn btn-warning" to={"/result"}>Search</Link> 
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDep: (dep) => dispatch(setDep(dep)),
    setDes: (des) => dispatch(setDes(des)),
    setDate: (date) => dispatch(setDate(date))
  }
}

function mapStateToProps(state) {
  return {
    dep: state.setSearch.dep,
    des: state.setSearch.des
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);