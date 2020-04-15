import Axios from "axios";
import React from 'react';
import {
  Redirect
} from "react-router-dom";

import Loader from './loading.component';

export default function (RedirectComponent) {
  // this is a function but returns a new component class
  // it will check if logged in by call get method,
  // if it passes authparser, then it's logged in
  // so can go to target, which is a props passed as params

  return class extends React.Component {

    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      Axios.get('/api/user/loggedIn')
        .then(res => {
          if (res.status === 200) {
            this.setState({loading: false});
          } else {
            throw new Error(res.error);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({loading: false, redirect: true});
        });
    }

    render() {
      const {loading, redirect} = this.state;
      if (loading) {
        return (<Loader></Loader>);
      }
      if (redirect) {
        return (<Redirect to="/login"/>);
      }
      return (<RedirectComponent {...this.props} />);
    }
  }
}