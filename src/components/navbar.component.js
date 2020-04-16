import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../public/assets/Logo.png';

class CustomizedNavbar extends React.Component {

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
        <div class="container">
          <Link class="navbar-brand" to={"/home"}><img src={Logo} height="50" width="355" alt="" /></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <Link class="nav-link" to={"/home"}>Home
                    <span class="sr-only">(current)</span>
                  </Link>
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
          </div>
        </div>
      </nav>
    );
  }
}

export default CustomizedNavbar;