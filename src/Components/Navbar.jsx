import React, { Component } from "react";
// import "./Navbar.css";
// import "../Components/Home/Company/HomePage.css";
import arkaLogo from "../Assets/img/arkademy-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

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

  handleRedirectHomeEng = () => {
    this.setState({
      redirectHomeEng: true
    });
  };

  redirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  redirectHomeEng = () => {
    if (this.state.redirectHomeEng) {
      return <Redirect to="/engineer/home" />;
    }
  };

  render() {
    return (
      <>
        <div class="navbar-fixed">
          {this.redirectHome()}
          {this.redirectHomeEng()}
          <nav>
            <div class="nav-wrapper">
              <div className="container">
                <a class="brand-logo">Hiring Channel</a>
                <ul class="right hide-on-med-and-down">
                  <li>
                    <a onClick={this.handleRedirectHomeEng}>Home</a>
                  </li>
                  <li>
                    <a>
                      <i class="large material-icons">face</i>
                    </a>
                  </li>
                  <li>
                    <a>Soultan</a>
                  </li>
                  <li>
                    <a onClick={this.handleRedirectHome}>
                      <i class="large material-icons">power_settings_new</i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
      // <nav className="d-flex navbar p-0 pl-4 navbar-expand-sm navbar-light bg-light mb-5">
      //   {this.redirectHome()}
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarNav"
      //   >
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
      //   <a className="navbar-brand" href="#">
      //     <img src={arkaLogo}></img>
      //   </a>
      //   <div className="collapse navbar-collapse d-flex" id="navbarNav">
      //     <ul className="navbar-nav" style={{ width: "100%" }}>
      //       <div className="home-profile-section d-flex flex-row align-items-center flex-start">
      //         <li className="nav-item home-text">
      //           <a href="#" className="nav-link">
      //             Home
      //           </a>
      //         </li>
      //         <li className="nav-item profile-navbar mr-5">
      //           <a href="#" className="nav-link">
      //             <img
      //               className="profile-image mr-2"
      //               src="https://source.unsplash.com/random"
      //             />
      //             Soultan
      //           </a>
      //         </li>
      //       </div>
      //       <div className="divider-section d-flex justify-content-center">
      //         <li className="nav-item divider ml-3 mr-5">
      //           <h3 className="text-secondary">HIRING CHANNEL APPLICATION</h3>
      //         </li>
      //       </div>
      //       <div className="utilities-section d-flex">
      //         <li className="nav-item chat-navbar">
      //           <a href="#" className="nav-link">
      //             <FontAwesomeIcon icon={faCommentDots} className="fa-lg" />
      //           </a>
      //         </li>
      //         <li className="nav-item notification-navbar">
      //           <a href="#" className="nav-link">
      //             <FontAwesomeIcon icon={faBell} className="fa-lg" />
      //           </a>
      //         </li>
      //         <li className="nav-item notification-navbar ml-5">
      //           <a href="#" className="nav-link">
      //             <FontAwesomeIcon
      //               onClick={this.handleRedirectHome}
      //               icon={faPowerOff}
      //               className="fa-lg"
      //             />
      //           </a>
      //         </li>
      //       </div>
      //     </ul>
      //   </div>
      // </nav>
    );
  }
}

export default Navbar;
