import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

import { login, clear } from '../actions/user.action';
import CustomizedNavbar from '../components/navbar.component';
import '../../public/style.css';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  handleChange(event, value) {
    this.setState({[value]: event.target.value || ''});
  }

  handleSubmit(event) {
    this.props.login(this.state);
    event.preventDefault();
  }

  componentDidMount() {
    this.props.clear();
    this.setState({username: '', password: ''});
  }

  render() {
    if (this.props.redirect) {
      return (<Redirect to={this.props.redirect}/>)
    }
    let error;
    if (this.props.error || this.props.valid.message) {
      error = (<h3>{this.props.error || this.props.valid.message}</h3>)
    }
    return (
      <div>
        <CustomizedNavbar></CustomizedNavbar>
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
                        <button class="btn btn-lg btn-warning btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" disabled={this.props.inFlight}>Sign in</button>
                        <div class="text-center">
                          <Link class="small" id="small-text" to={'/register'}>Create account</Link>
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
    login: (user) => dispatch(login(user)),
    clear: () => dispatch(clear()),
  }
};


function mapStateToProps(state, props) {
  return {
    ...state.user,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin)