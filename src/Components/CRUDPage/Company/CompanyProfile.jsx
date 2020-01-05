import React, { Component } from "react";
import Navbar from "../../Navbar";
import { connect } from "react-redux";
import { getCompany } from "../../../Redux/Actions/Company/getCompany";
import ProfileCompany from "./ProfileCompany";
import BtnInsert from "../../../Assets/Button/BtnInsert";
import BtnUpdate from "../../../Assets/Button/BtnUpdate";
import M from "materialize-css";
import BtnInsertM from "../../../Assets/Button/Modal/BtnInsertM";
import BtnUpdateM from "../../../Assets/Button/Modal/BtnUpdateM";
import { Redirect } from "react-router-dom";

class CompanyProfile extends Component {
  redirectHomeCompany = () => {
    if (this.props.homeCompany) {
      return <Redirect to="/company/home" />;
    }
  };

  redirectHomeProfile = () => {
    if (this.props.profileCompany) {
      return <Redirect to="/company/profile" />;
    }
  };

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    await this.props.dispatch(getCompany(config));
    var detail = document.querySelectorAll(".sidenav");
    M.Sidenav.init(detail);
  }
  render() {
    const companyProfile = this.props.companyData;
    return (
      <>
        {this.redirectHomeProfile()}
        {this.redirectHomeCompany()}
        <section id="navbar-list" className="navbar-list">
          <div className="row">
            <div className="col s12">
              <Navbar />
            </div>
          </div>
        </section>
        <section id="data-profile" className="data-profile">
          <div className="row">
            <div className="col s12 d-flex flex-column align-items-center">
              <ProfileCompany companyProfile={companyProfile} />
              <div className="mt-2 d-flex flex-row justify-content-center">
                <BtnUpdateM/>
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
    companyData: state.getCompany.companyData,
    homeCompany: state.redirectNavbar.homeCompany,
    profileCompany: state.redirectNavbar.profileCompany
  };
};

export default connect(mapStateToProps)(CompanyProfile);
