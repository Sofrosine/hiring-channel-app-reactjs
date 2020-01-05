import React, { Component } from "react";
// import "./Navbar.css";
// import "../Components/Home/Company/HomePage.css";
import arkaLogo from "../Assets/img/arkademy-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import M from 'materialize-css'
import {connect} from 'react-redux'

import {
  faSearch,
  faBell,
  faCommentDots,
  faFrown,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  state = {
    redirectHome: false,
    redirectHomeEng: false
  };

  handleRedirectHome = () => {
    this.setState({
      redirectHome: true
    });
    localStorage.clear();
  };

  redirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  redirectHome2 = async () => {
    await this.props.redirectHomeTrue()
    this.props.redirectHomeFalse()
  }

  redirectProfile = async () => {
    await this.props.redirectProfileTrue()
    this.props.redirectProfileFalse() 
  }

  componentDidMount() {
    M.AutoInit()
  }

  render() {
    return (
      <>
        <div class="navbar-fixed">
          {this.redirectHome()}
          <nav>
            <div class="nav-wrapper">
              <div className="container">
                <a class="brand-logo">Hiring Channel</a>
                <a href="#" data-target="mobile-nav" class="sidenav-trigger">
                  <i class="material-icons">menu</i>
                </a>
                <ul class="right hide-on-med-and-down">
                  <li>
                    <a onClick={this.redirectHome2}>
                      <i class="large material-icons">home</i>
                    </a>
                  </li>
                  <li>
                    <a onClick={this.redirectProfile}>
                      <i class="large material-icons">account_circle</i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i class="large material-icons">notifications</i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i class="large material-icons">textsms</i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i
                        class="large material-icons"
                        onClick={this.handleRedirectHome}
                      >
                        power_settings_new
                        </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <ul class="sidenav d-flex flex-column" id="mobile-nav">
          <div className="row">
            <div className="col s12">
              <li>
                <a href="#">
                  <i class="small material-icons red-text text-lighten-2">home</i>Home
                  </a>
              </li>
              <li>
                <a href="#">
                  <i class="small material-icons red-text text-lighten-2">account_circle</i>Profile
                  </a>
              </li>
              <li>
                <a href="#">
                  <i class="small material-icons red-text text-lighten-2">notifications</i>Notification
                  </a>
              </li>
              <li>
                <a href="#">
                  <i class="small material-icons red-text text-lighten-2">textsms</i>Chat
                  </a>
              </li>
              <li>
                <a href="#" onClick={this.handleRedirectHome}>
                  <i
                    class="small material-icons red-text text-lighten-2"
                    
                  >
                    power_settings_new
                        </i>Logout
                  </a>
              </li>
            </div>
          </div>
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeEngineer: state.redirectNavbar.homeEngineer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    redirectHomeTrue: () => {dispatch({type: "REDIRECT_HOME_TRUE"})},
    redirectHomeFalse: () => { dispatch({ type: "REDIRECT_HOME_FALSE" }) },
    redirectProfileTrue: () => { dispatch({ type: "REDIRECT_PROFILE_TRUE" }) },
    redirectProfileFalse: () => { dispatch({ type: "REDIRECT_PROFILE_FALSE" }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar) ;
