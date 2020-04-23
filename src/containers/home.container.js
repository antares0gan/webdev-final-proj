import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setDep, setDes, setDate } from '../actions/search.action';
import { getAPITickets, fetchArr, fetchDep, cleanCount } from '../actions/ticket.action';
import CustomizedNavbar from '../components/navbar.component';
import Loader from '../components/loading.component';
import '../../public/style.css';
import RollAd1 from '../../public/assets/rolling_ad_1.jpg';
import RollAd2 from '../../public/assets/rolling_ad_2.jpg';
import RollAd3 from '../../public/assets/rolling_ad_3.jpg';
import Ad1 from '../../public/assets/ad_1.jpg';
import Ad2 from '../../public/assets/ad_2.jpg';
import Ad3 from '../../public/assets/ad_3.jpg';
import Bojack from '../../public/assets/bojack_background.jpg';

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

  handleSubmit(event) {
    this.props.fetchDep(this.props.dep);
    this.props.fetchArr(this.props.des);
    this.props.fetchTickets(this.props.dep, this.props.des);
    event.preventDefault();
  }
  
  render() {
    if (this.props.redirect && this.props.count === 3) {
      this.props.cleanCount();
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
      <div id="home-background">
        <CustomizedNavbar></CustomizedNavbar>
        <ToastContainer hideProgressBar position="bottom-center" autoClose={3000}/>
        <div id="search-box-wrapper">
          <form id="search-box" class="rounded" onSubmit={(e) => this.handleSubmit(e)}>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputDep">Depature</label>
                <input type="text" class="form-control" id="inputDep" placeholder="JFK" minLength="3" maxLength="3" onKeyPress={event => this.inputValid(event)} onChange={e => this.props.setDep(e.target.value)} required/>
              </div>
              <div class="form-group col-md-6">
                <label for="inputDes">Destination</label>
                <input type="text" class="form-control" id="inputDes" placeholder="LAX" minLength="3" maxLength="3" onKeyPress={event => this.inputValid(event)} onChange={e => this.props.setDes(e.target.value)} required/>
              </div>
            </div>
            <div class="form-group">
              <label for="inputDate">Date</label>
              <input type="date" class="form-control" id="inputDate" min={this.getDate()} onChange={e => this.props.setDate(e.target.value)} required/>
            </div>
            <button type="submit" class="btn btn-warning" >Search</button> 
          </form>
        </div>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={Ad1} alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={Ad2} alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={Ad3} alt="Third slide" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <img id="ad-image" src={Bojack} class="img-fluid" alt="ad1"/>
        <div class="card-group">
          <div class="card" id="left-card">
            <img class="card-img-top" src={RollAd1} alt="Card image cap" />
            {/* <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div> */}
          </div>
          <div class="card" id="central-card">
            <img class="card-img-top" src={RollAd2} alt="Card image cap" />
            {/* <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div> */}
          </div>
          <div class="card" id="right-card">
            <img class="card-img-top" src={RollAd3} alt="Card image cap" />
            {/* <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDep: (dep) => dispatch(setDep(dep)),
    setDes: (des) => dispatch(setDes(des)),
    setDate: (date) => dispatch(setDate(date)),
    fetchTickets: (dep, des) => dispatch(getAPITickets(dep, des)),
    fetchDep: (iataCode) => dispatch(fetchDep(iataCode)),
    fetchArr: (iataCode) => dispatch(fetchArr(iataCode)),
    cleanCount: () => dispatch(cleanCount())
  }
}

function mapStateToProps(state) {
  return {
    dep: state.setSearch.dep,
    des: state.setSearch.des,
    loading: state.ticket.inFlight,
    error: state.ticket.isError,
    redirect: state.ticket.redirect,
    count: state.ticket.count
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);