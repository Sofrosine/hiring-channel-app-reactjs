import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import whiteLogo from "../../Assets/img/Arkademy-Putih.svg";
import vectorLogo from "../../Assets/img/vector-hiring.png";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faCommentDots,
  faFrown,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import qs from "querystring";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLoginEngineer } from "../../Redux/Actions/LoginRegister/Engineer/getLoginEngineer";
import { postRegisterEngineer } from "../../Redux/Actions/LoginRegister/Engineer/postRegisterEngineer";

class LoginEngineer extends Component {
  state = {
    email: "",
    password: "",
    redirectHome: false
  };

  handleOnChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmitRegister = async e => {
    e.preventDefault();
    await this.props.dispatch(postRegisterEngineer(this.state.email, this.state.password))
      .then(async result => {
        console.log(result)
        if (
          result.data === "Your email is not valid" ||
          result.data === "Your password is not valid "
        ) {
          Swal.fire({
            title: result.data,
            text: "Please input your valid data",
            icon: "warning"
          });
        } else {
          await this.props.dispatch(getLoginEngineer(this.state.email,this.state.password))
          .then((result) => {
            const message = this.props.engineerData.data.message
            const data = this.props.engineerData.data.data
            const { token, id_engineer } = data;
            localStorage.setItem("id_engineer", JSON.stringify(id_engineer));
            console.log(token);
            localStorage.setItem("accessToken", JSON.stringify(token));
            console.log(localStorage.getItem("accessToken"));
          });
          Swal.fire({
            title: "Success",
            text: "Successfully Registered",
            icon: "success"
          });
          this.props.history.push("/engineer/insert");
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Failed",
          text: "Your email already exists",
          icon: "warning"
        });
      });
  };

  handleSubmitLogin = async e => {
    e.preventDefault();
    await this.props.dispatch(getLoginEngineer(this.state.email, this.state.password))
      .then(async (result) => {
        const message = this.props.engineerData.data.message
        const data = this.props.engineerData.data.data
        if (
          message === "Password is incorrect!" ||
          message === "Email or password is incorrect!"
        ) {
          Swal.fire({
            title: `${message}`,
            text: "Please insert the valid value",
            icon: "warning"
          });
        } else {
          const { token, id_engineer } = data;
          localStorage.setItem("id_engineer", JSON.stringify(id_engineer));
          console.log(token);
          localStorage.setItem("accessToken", JSON.stringify(token));
          console.log(localStorage.getItem("accessToken"));
          const swal = await Swal.fire({
            title: "Login Success",
            icon: "success"
          });
          this.setState({
            ...this.state,
            redirectHome: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "You do not insert the data",
          text: "Please insert the data",
          icon: "error"
        });
      });
  };

  redirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/engineer/home" />;
    }
  };

  checkToken = () => {
    if (localStorage.getItem("id_engineer")) {
      return this.setState({
        ...this.state,
        redirectHome: true
      });
    }
  };

  componentWillMount() {
    this.checkToken();
  }

  render() {
    return (
      <>
        <section id="login-page" className="login-page">
          <div className="row">
            <div className="col s12 m7">
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
                    Millions of small business use Freelancer to turn their
                    ideas into reality.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m5">
                <div className="login-right">
                  <div className="login-text">
                    <h1 className="grey-text text-darken-2">
                      Login / Register as Engineer
                  </h1>
                    <Link to="/">
                      <FontAwesomeIcon className="fa-lg" icon={faHome} />
                    </Link>
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
                            value={this.state.email}
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
                            value={this.state.password}
                            className="form-control"
                          />
                        </div>
                        <div className="forgotPassword">
                          <a href="#">Forgot Password?</a>
                        </div>
                      </div>
                      <div className="button">
                        {this.redirectHome()}
                        <button
                          className="buttonLogin red lighten-2"
                          onClick={this.handleSubmitLogin}
                        >
                          Login
                      </button>
                        <button
                          className="buttonRegister"
                          onClick={this.handleSubmitRegister}
                        >
                          Register
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerData: state.getLoginEngineer.engineerData
  };
};

export default connect(mapStateToProps)(LoginEngineer);
