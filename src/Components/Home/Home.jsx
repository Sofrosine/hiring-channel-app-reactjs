import React, { Component } from "react";
import whiteLogo from "../../Assets/img/Arkademy-Putih.svg";
import vectorLogo from "../../Assets/img/vector-hiring.png";
import "./Home.css";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    redirectEngineer: false,
    redirectCompany: false
  };

  setRedirectEngineer = () => {
    this.setState({
      redirectEngineer: true
    });
  };

  renderRedirectEngineer = () => {
    if (this.state.redirectEngineer) {
      return <Redirect to="/login/engineer" />;
    }
  };

  setRedirectCompany = () => {
    this.setState({
      redirectCompany: true
    });
  };

  renderRedirectCompany = () => {
    if (this.state.redirectCompany) {
      return <Redirect to="/login/company" />;
    }
  };

  render() {
    return (
      <div className="home">
        <div className="content">
          <h1 className="mb-5 text-white">Welcome to Hiring Channel Web Application</h1>
          <div className="buttonList d-flex flex-column flex-sm-row">
            {this.renderRedirectCompany()}
            <button className="company mb-3 mb-sm-0 mr-sm-3 mr-md-5" onClick={this.setRedirectCompany}>
              <h2>Company</h2>
            </button>
            {this.renderRedirectEngineer()}
            <button className="engineer" onClick={this.setRedirectEngineer}>
              <h2>Engineer</h2>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
