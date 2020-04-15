import React from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { clear, register, validate } from '../actions/user.action';
import CustomizedNavbar from '../components/navbar.component';
import '../../public/style.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', validatePassword: ''};
  }

  handleChange(event, value) {
    this.setState({[value]: event.target.value || ''});
  }

  handleSubmit(event) {
    this.props.validate(this.state);
    event.preventDefault();
  }

  componentDidMount() {
    this.props.clear();
    this.setState({
      username: '',
      password: '',
      validatePassword: '',
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.valid.success) {
      this.props.register(this.state.username, this.state.password);
    }
  }

  render() {
    if (this.props.redirect) {
      return (<Redirect to={this.props.redirect}/>)
    }

    let error;
    if (this.props.error || this.props.valid.message) {
      error = (
        this.props.error || this.props.valid.message
      )
      toast(error);
      this.props.clear();
    }

    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
        <ToastContainer hideProgressBar position="bottom-center" autoClose={3000}/>
        <div class="container-fluid">
          <div class="row no-gutter">
            <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div class="col-md-8 col-lg-6">
              <div class="login d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-md-9 col-lg-8 mx-auto">
                      <h3 class="login-heading mb-4">Welcome back!</h3>
                      <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div class="form-label-group">
                          <input type="text" id="inputName" class="form-control" placeholder="Username" disabled={this.props.inFlight} value={this.state.username} onChange={(e) => this.handleChange(e, 'username')} required autofocus />
                          <label for="inputName">Username</label>
                        </div>
                        <div class="form-label-group">
                          <input type="password" id="inputPassword" class="form-control" placeholder="Password" disabled={this.props.inFlight} value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} required />
                          <label for="inputPassword">Password</label>
                        </div>
                        <div class="form-label-group">
                          <input type="password" id="validatePassword" class="form-control" placeholder="Re-enter Password" disabled={this.props.inFlight} value={this.state.validatePassword} onChange={(e) => this.handleChange(e, 'validatePassword')} required />
                          <label for="validatePassword">Validate Password</label>
                        </div>
                        <button class="btn btn-lg btn-warning btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" disabled={this.props.inFlight}>Create account</button>
                        <div class="text-center">
                          <Link class="small" id="small-text" to={'/login'}>Sign in</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch, props) {
  return {
    register: (username, password) => dispatch(register(username, password)),
    clear: () => dispatch(clear()),
    validate: (user) => dispatch(validate(user)),
  }
}


function mapStateToProps(state, props) {
  return {
    ...state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)