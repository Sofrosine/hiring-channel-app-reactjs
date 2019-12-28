import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import whiteLogo from "../../Assets/img/Arkademy-Putih.svg";
import vectorLogo from "../../Assets/img/vector-hiring.png";
import "./Login.css";

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleOnChange = (e) => {
    console.log(e)
  }

  render() {
    return (
      <div className="login">
        <div className="login-left">
          <div className="white-logo">
            <img src={whiteLogo}></img>
          </div>
          <div className="vector-logo">
            <img src={vectorLogo}></img>
          </div>
          <div className="description">
            <h2>Hire expert freelancers for any job, online</h2>
            <p>
              Millions of small business use Freelancer to turn their ideas into
              reality.
            </p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-text">
            <h1>Login</h1>
          </div>
          <div className="form">
            <form>
              <div className="input">
                <div className="form-group">
                  <label htmlFor="email" className="font-weight-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="input email.."
                    onChange={this.handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="font-weight-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="input password..."
                    onChange={this.handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="forgotPassword">
                  <a href="#">Forgot Password?</a>
                </div>
              </div>
              <div className="button">
                <button className="buttonLogin">Login</button>
                <button className="buttonRegister">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
