import React, { Component } from "react";
import "./HomePage.css";
import arkaLogo from "../../../Assets/img/arkademy-logo.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faCommentDots,
  faFrown,
  faArrowAltCircleDown,
  faStar,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import UserEngineer from "../UserEngineer";
import { Redirect } from "react-router-dom";
import M from "materialize-css";

import { connect } from "react-redux";
import { getUser } from "../../../Redux/Actions/HomePage/getUser";
import { searchUser } from "../../../Redux/Actions/HomePage/searchUser";
import Navbar from "../../Navbar";
import Pagination from "./Util/Pagination";
import Card from "../../../Assets/Card";
import { getProfileEngineer } from "../../../Redux/Actions/Engineer/getProfileEngineer";

class HomePage extends Component {
  state = {
    engineers: [],
    name: "",
    user: "",
    skill: "",
    sort: "" || "name",
    order: "" || "ASC",
    limit: 5,
    page: 1,
    totalPages: "",
    totalData: "",
    redirectHome: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("name", this.state.name);
    console.log("skill", this.state.skill);
  };

  handlePageNext = e => {
    let page = this.state.page;
    if (this.state.page !== this.state.pages) {
      this.setState({
        page: page + 1
      });
    }
    console.log("page", this.state.page);
  };

  handlePagePrevious = e => {
    let page = this.state.page;
    if (page > 1) {
      this.setState({
        page: page - 1
      });
    } else {
      this.setState({
        page: 1
      });
    }

    console.log("page", this.state.page);
  };

  handleSort = e => {
    e.preventDefault();
    console.log(this.state.sort);
    this.setState({
      ...this.state,
      sort: e.target.text
    });
  };

  handleOrder = e => {
    e.preventDefault();
    console.log(this.state.order);
    this.setState({
      ...this.state,
      order: e.target.text
    });
  };

  handleSearch2 = async () => {
    const params = {
      name: this.state.name,
      skill: this.state.skill,
      sort_by: this.state.sort,
      order: this.state.order,
      limit: this.state.limit,
      page: this.state.page
    };

    try {
      await this.props.dispatch(searchUser(params));
      const result = await this.props.searchUser;
      if (
        this.state.name === "" &&
        this.state.skill === "" &&
        this.state.sort === ""
      ) {
        this.getAllEngineer();
      } else {
        this.setState({
          ...this.state,
          engineers: result.searchData.data.data,
          pages: result.searchData.data.pages,
          totalData: result.searchData.data.total
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  getAllEngineer = async () => {
    await this.props.dispatch(getUser());
    const user = await this.props.user;
    this.setState({
      engineers: user.userData.data.data
    });
    console.log("engineerzz", this.state.engineers);
  };

  nextPage = async e => {
    const next = await this.handlePageNext(e);
    this.handleSearch2(e);
  };

  previousPage = async e => {
    const previous = await this.handlePagePrevious(e);
    this.handleSearch2(e);
  };

  getUserId = e => {
    console.log('user',this.state.user);
    this.setState({
      ...this.state,
      user: e.target.name
    });
    console.log('name',e.target.name);
  };

  // getProfile = e => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${JSON.parse(
  //         localStorage.getItem("accessToken")
  //       )}`
  //     }
  //   };
  //   // axios
  //   //   .get(`http://localhost:5000/engineer/user/${this.state.user}`, config)
  //   this.props.dispatch(getProfileEngineer(this.state.user))
  //     // .get(`https://hiring-channel-application.herokuapp.com/engineer/user/${this.state.user}`, config)
  //     .then(result => {
  //       console.log('asjdlkasjd', this.props.profileEngineer)
  //       console.log(result);
  //       const data = result.data;
  //       this.setState({
  //         ...this.state,
  //         profile: Object.values(data[0])
  //       });
  //       this.props.history.push(`/user/${this.state.user}`);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
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

  handleLimitPlus = e => {
    const limit = this.state.limit;
    this.setState({
      ...this.state,
      limit: limit + 1
    });
  };

  handleLimitMin = e => {
    const limit = this.state.limit;
    if (limit > 1) {
      this.setState({
        ...this.state,
        limit: limit - 1
      });
    } else {
      this.setState({
        ...this.state,
        limit: 1
      });
    }
  };

  limitPlus = async e => {
    const plus = await this.handleLimitPlus(e);
    this.handleSearch2();
  };

  limitMin = async e => {
    const min = await this.handleLimitMin(e);
    this.handleSearch2();
  };

  checkToken = () => {
    if (!localStorage.getItem("id_company")) {
      return this.setState({
        ...this.state,
        redirectHome: true
      });
    }
  };

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

  searching = async e => {
    await this.handleChange(e);
    this.handleSearch2();
  };

  componentWillMount() {
    this.checkToken();
  }

  componentDidMount() {
    // this.getAllEngineer();
    this.handleSearch2();
    M.AutoInit();
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  }

  render() {
    return (
      <div className="homepage">
        {this.redirectHomeCompany()}
        {this.redirectHomeProfile()}
        {this.redirectHome()}
        <section id="navbar-list" className="navbar-list mb-3 ">
          <Navbar />
        </section>

        <section className="page-list" id="page-list">
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                <a
                  onClick={() => this.props.history.push("/company/progress")}
                  class="mr-2 waves-effect waves-light btn red lighten-2 white-text"
                >
                  Progress
                </a>

                <a
                  onClick={() => this.props.history.push("/company/project")}
                  class="waves-effect waves-light btn red lighten-2 white-text"
                >
                  Project List
                </a>
              </div>
              <div className="col s12 m6"></div>
            </div>
          </div>
        </section>
        <section id="pagination-list" className="pagination-list">
          <div className="container">
            <div className="row">
              <div className="input-field col s12 m4">
                <form onSubmit={this.handleSearch2}>
                  <div className="input-field">
                    <i class="material-icons prefix red-text text-lighten-2">
                      contacts
                    </i>
                    <input
                      type="text"
                      name="name"
                      id="searching-name"
                      class="validate"
                      aria-label="Search"
                      placeholder="Search by Name"
                      onChange={this.searching}
                      value={this.state.name}
                    />
                    <label for="searching-name" className="white-text">
                      Search by Name
                    </label>
                  </div>
                  <div className="input-field">
                    <i class="material-icons prefix red-text text-lighten-2">
                      build
                    </i>
                    <input
                      className="p-1"
                      type="text"
                      id="searching-skill"
                      name="skill"
                      placeholder="Search by Skill"
                      onChange={this.searching}
                      value={this.state.skill}
                    />
                    <label for="searching-skill" className="white-text">
                      Search by Skill
                    </label>
                  </div>
                </form>
              </div>

              <div className="col s12 m4 m-auto right">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link red-text text-lighten-2 white"
                      href="#"
                      onClick={this.limitMin}
                    >
                      -
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link red-text text-lighten-2 white"
                      href="#"
                    >
                      {this.state.limit}
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link red-text text-lighten-2 white"
                      href="#"
                      onClick={this.limitPlus}
                    >
                      +
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 center">
                <a
                  class="dropdown-trigger btn red lighten-2 white-text"
                  href="#"
                  data-target="dropdown2"
                >
                  Sort By
                </a>
                <ul id="dropdown2" class="dropdown-content">
                  <li>
                    <a
                      href="#!"
                      className="red-text text-lighten-2"
                      onClick={this.handleSearch2}
                      onMouseOver={this.handleSort}
                    >
                      name
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="red-text text-lighten-2"
                      onClick={this.handleSearch2}
                      onMouseOver={this.handleSort}
                    >
                      skill
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="red-text text-lighten-2"
                      onClick={this.handleSearch2}
                      onMouseOver={this.handleSort}
                    >
                      dateupdated
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col s12 m6 center">
                <a
                  class="dropdown-trigger btn red lighten-2 white-text"
                  href="#"
                  data-target="dropdown1"
                >
                  Order
                </a>
                <ul id="dropdown1" class="dropdown-content">
                  <li>
                    <a
                      href="#!"
                      className="red-text text-lighten-2"
                      onClick={this.handleSearch2}
                      onMouseOver={this.handleOrder}
                    >
                      ASC
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="red-text text-lighten-2"
                      onClick={this.handleSearch2}
                      onMouseOver={this.handleOrder}
                    >
                      DESC
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="card-list mb-2">
          <Card user={this.state.user} getProfile={this.getProfile} getUserId={this.getUserId} engineerList={this.state.engineers}/>
        </div>
        <section id="change-page" className="change-page">
          <div className="row">
            <div className="col s12 d-flex flex-direction-row justify-content-center">
              <Pagination prevPage={this.previousPage} nextPage={this.nextPage} totalData={this.state.totalData} page={this.state.page} pages={this.state.pages}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.getUser,
    searchUser: state.searchUser,
    homeCompany: state.redirectNavbar.homeCompany,
    profileEngineer: state.getProfileEngineer.profileEngineer,
   profileCompany: state.redirectNavbar.profileCompany
  };
};

export default connect(mapStateToProps)(HomePage);
