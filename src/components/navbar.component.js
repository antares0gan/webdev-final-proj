import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Axios from 'axios';

import { setUsername, logout, clean } from '../actions/login.action';
import Logo from '../../public/assets/Logo.png';

class CustomizedNavbar extends React.Component {

  componentDidMount() {
    Axios.get('api/user/username')
      .then(res => this.props.setUsername(res.data),
      error => console.log(error))
  }

  clickHandler() {
    Axios.get('api/user/logout')
      .then(res => this.props.logout(),
      error => console.log(error))
  }

  switchDisplay() {
    if (this.props.username === '') {
      return (
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link class="nav-link" to={"/home"}>Home<span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={"/premium"}>Premium Black</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={"/profile"}>My Tickets</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={"/login"}>Log in/Register</Link>
          </li>
        </ul>
      )
    }
    return (
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <Link class="nav-link" to={"/home"}>Home<span class="sr-only">(current)</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/profile"}>Welcome, {this.props.username}</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/premium"}>Premium Black</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/profile"}>My Tickets</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={() => this.clickHandler()}>Log out</a>
        </li>
      </ul>
    )
  }

  render() {
    if (this.props.redirect) {
      this.props.clean();
      return <Redirect to={'/home'} ></Redirect>
    }
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
        <div class="container">
          <Link class="navbar-brand" to={"/home"}><img src={Logo} height="50" width="355" alt="" /></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            {this.switchDisplay()}
          </div>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsername: (username) => dispatch(setUsername(username)),
    logout: () => dispatch(logout()),
    clean: () => dispatch(clean())
  }
}

function mapStateToProps(state) {
  return {
    username: state.loginDisplay.username,
    redirect: state.loginDisplay.redirect
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CustomizedNavbar);