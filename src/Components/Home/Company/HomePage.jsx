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
import M from 'materialize-css'

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
    image: [
      "https://source.unsplash.com/random/800x720",
      "https://source.unsplash.com/random/900x720",
      "https://source.unsplash.com/random/600x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720"
    ]
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('name',this.state.name)
    console.log('skill', this.state.skill)
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

  handleSearch = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/engineer/filter",
      params: {
        name: this.state.name,
        skill: this.state.skill,
        sort_by: this.state.sort,
        order: this.state.order,
        limit: this.state.limit,
        page: this.state.page
      }
    })
      .then(result => {
        // console.log(this.state.data)
        console.log(result);
        const searchResult = result.data.data;
        if (
          this.state.name === "" &&
          this.state.skill === "" &&
          this.state.sort === ""
        ) {
          this.getAllEngineer();
        } else {
          this.setState({
            ...this.state,
            // name: '',
            engineers: searchResult,
            pages: result.data.pages,
            totalData: result.data.total
            // skill: '',
            // data: searchResult
          });
        }
        console.log(this.state.name);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSearch2 = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/engineer/filter",
      params: {
        name: this.state.name,
        skill: this.state.skill,
        sort_by: this.state.sort,
        order: this.state.order,
        limit: this.state.limit,
        page: this.state.page
      }
    })
      .then(result => {
        // console.log(this.state.data)
        console.log("result", result);
        console.log("totaldata", result.data.total);
        console.log("pages", result.data.pages);
        const searchResult = result.data.data;
        if (
          this.state.name === "" &&
          this.state.skill === "" &&
          this.state.sort === ""
        ) {
          this.getAllEngineer();
        } else {
          this.setState({
            ...this.state,
            // name: '',
            engineers: searchResult,
            pages: result.data.pages,
            totalData: result.data.total
            // skill: '',
            // data: searchResult
          });
        }
        console.log("engineers", this.state.engineers);
        console.log("pages", this.state.pages);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllEngineer = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get("http://localhost:5000/engineer/filter")
      .then(result => {
        console.log(result.data.data);
        const data = result.data.data;
        this.setState({
          ...this.state,
          engineers: data
        });
        console.log(this.state.engineers);
      })
      .catch(err => {
        console.log(err);
        console.log("Login first");
      });
  };

  nextPage = async e => {
    const next = await this.handlePageNext(e);
    this.handleSearch(e);
  };

  previousPage = async e => {
    const previous = await this.handlePagePrevious(e);
    this.handleSearch(e);
  };

  getUserId = e => {
    // console.log(this.state.user);
    this.setState({
      ...this.state,
      user: e.target.name
    });
    // console.log(e.target.name);
  };

  getProfile = e => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get(`http://localhost:5000/engineer/user/${this.state.user}`, config)
      .then(result => {
        console.log(result);
        // console.log(result.data);
        const data = result.data;
        this.setState({
          ...this.state,
          profile: Object.values(data[0])
        });
        this.props.history.push(`/user/${this.state.user}`);
        // console.log(this.state.profile);
        // console.log(this.state.profile)
      })
      .catch(err => {
        console.log(err);
      });
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
    this.handleSearch(e);
  };

  limitMin = async e => {
    const min = await this.handleLimitMin(e);
    this.handleSearch(e);
  };

  checkToken = () => {
    if (!localStorage.getItem("id_company")) {
      return this.setState({
        ...this.state,
        redirectHome: true
      });
    }
  };

  searching = async (e) => {
    await this.handleChange(e)
    this.handleSearch()
  }

  componentWillMount() {
    this.checkToken();
  }

  componentDidMount() {
    this.handleSearch2();
    M.AutoInit()
  }

  render() {
    return (
      <div className="homepage">
        {this.redirectHome()}
        <section id="navbar-list" className="navbar-list mb-3 ">
          <div class="navbar-fixed">
            <nav>
              <div class="nav-wrapper">
                <div className="container">
                  <a class="brand-logo">Hiring Channel</a>
                  <ul class="right hide-on-med-and-down">
                    <li>
                      <a>
                        <i class="large material-icons">home</i>
                      </a>
                    </li>
                    <li>
                      <a>
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
        </section>
        <section className="page-list" id="page-list">
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                <a onClick={() => this.props.history.push('/company/progress')} class="mr-2 waves-effect waves-light btn red lighten-2 white-text">Progress</a>
              
              
                <a onClick={() => this.props.history.push('/company/project')} class="waves-effect waves-light btn red lighten-2 white-text">Project List</a>
              </div>
              <div className="col s12 m6"></div>
            </div>
          </div>
        </section>
        <section id="pagination-list" className="pagination-list">
          <div className="container">
            <div className="row">
              <div className="input-field col s12 m4">
                <form onSubmit={this.handleSearch}>
                  <div className="input-field">
                    <i class="material-icons prefix red-text text-lighten-2">contacts</i>
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
                    <i class="material-icons prefix red-text text-lighten-2">build</i>
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
                      onClick={this.previousPage}
                    >
                      &laquo;
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link red-text text-lighten-2 white" href="#">
                      {this.state.page} from {this.state.pages}
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link red-text text-lighten-2 white" href="#">
                      {this.state.totalData}
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link red-text text-lighten-2 white"
                      href="#"
                      // onMouseEnter={this.handlePageNext}
                      // onClick={this.handleSearch}
                      onClick={this.nextPage}
                    >
                      &raquo;
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col s12 m4 m-auto right">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link red-text text-lighten-2 white" href="#" onClick={this.limitMin}>
                      -
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link red-text text-lighten-2 white" href="#">
                      {this.state.limit}
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link red-text text-lighten-2 white"
                      href="#"
                      // onMouseEnter={this.handlePageNext}
                      // onClick={this.handleSearch}
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
                {/* <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort by
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      onClick={this.handleSearch}
                      onMouseEnter={this.handleSort}
                    >
                      name
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={this.handleSearch}
                      onMouseEnter={this.handleSort}
                    >
                      skill
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={this.handleSearch}
                      onMouseEnter={this.handleSort}
                    >
                      dateupdated
                    </a>
                  </div> */}
                {/* </div> */}
                <a class='dropdown-trigger btn red lighten-2 white-text' href='#' data-target='dropdown2'>Sort By</a>
                <ul id='dropdown2' class='dropdown-content'>
                  <li><a href="#!" className="red-text text-lighten-2" onClick={this.handleSearch}
                    onMouseOver={this.handleSort}>name</a></li>
                  <li><a href="#!" className="red-text text-lighten-2" onClick={this.handleSearch}
                    onMouseOver={this.handleSort}>skill</a></li>
                  <li><a href="#!" className="red-text text-lighten-2" onClick={this.handleSearch}
                    onMouseOver={this.handleSort}>dateupdated</a></li>
                </ul>
              </div>
              <div className="col s12 m6 center">
                <a class='dropdown-trigger btn red lighten-2 white-text' href='#' data-target='dropdown1'>Order</a>
                <ul id='dropdown1' class='dropdown-content'>
                  <li><a href="#!" className="red-text text-lighten-2" onClick={this.handleSearch}
                    onMouseOver={this.handleOrder}>ASC</a></li>
                  <li><a href="#!" className="red-text text-lighten-2" onClick={this.handleSearch}
                    onMouseOver={this.handleOrder}>DESC</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="card-list">
          {this.state.engineers.map(engineer => {
            return (
              // onclick
              <div
                onClick={this.getProfile}
                onMouseOver={this.getUserId}
                key={engineer.id}
                name={engineer.id}
              >
                <div className="cards" name={engineer.id}>
                  <div className="black-box" name={engineer.id}></div>
                  <div className="text-inside" name={engineer.id}>
                    <p className="name" name={engineer.id}>
                      {engineer.Name}
                    </p>
                    <p name={engineer.id}>{engineer.Description}</p>
                    <span className="mb-3" name={engineer.id}>
                      <FontAwesomeIcon
                        style={{ color: "#34abeb" }}
                        icon={faArrowAltCircleDown}
                        name={engineer.id}
                      />
                      <p className="ml-1" name={engineer.id}>
                        {engineer.total_project} Projects
                      </p>
                      <FontAwesomeIcon
                        className="ml-3"
                        style={{ color: "yellow" }}
                        icon={faStar}
                        name={engineer.id}
                      />
                      <p className="ml-1" name={engineer.id}>
                        {`${engineer.success_rate || 0}% Success Rate`}
                      </p>
                    </span>
                    <div className="skills" name={engineer.id}>
                      <p name={engineer.id}>Skills:</p>
                      <p className="overflow-test" name={engineer.id}>
                        {engineer.Skill}
                      </p>
                    </div>
                  </div>
                  <img
                    onClick={this.getProfile}
                    onMouseOver={this.getUserId}
                    className="image-home"
                    src={
                      this.state.image[
                        Math.floor(Math.random() * this.state.image.length)
                      ]
                    }
                    name={engineer.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
