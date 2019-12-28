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
import {Redirect} from 'react-router-dom'

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
  };

  handlePageNext = e => {
    let page = this.state.page;
    this.setState({
      page: page + 1
    });
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

  handleSearch = e => {
    e.preventDefault();
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
            engineers: searchResult
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
            engineers: searchResult
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
        this.props.history.push(`/user/${this.state.user}`)
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
    })
    localStorage.clear()
  }

  redirectHome = () => {
    if (this.state.redirectHome) {
      return (
        <Redirect to="/" />
      )
    }
  }

  handleLimitPlus = (e) => {
    const limit = this.state.limit
    this.setState({
      ...this.state,
      limit: limit + 1
    })
  }

  handleLimitMin = (e) => {
    const limit = this.state.limit
    if (limit > 1) {
      this.setState({
        ...this.state,
        limit: limit - 1
      })
    } else {
      this.setState({
        ...this.state,
        limit: 1
      })
    }
  }

  limitPlus = async e => {
    const plus = await this.handleLimitPlus(e);
    this.handleSearch(e);
  };

  limitMin = async e => {
    const min = await this.handleLimitMin(e);
    this.handleSearch(e);
  };


  checkToken = () => {
    if (!localStorage.getItem('id_company')) {
      return this.setState({
        ...this.state,
        redirectHome: true
      })
    }
  }

  componentWillMount() {
    this.checkToken()
  }

  componentDidMount() {
    this.handleSearch2();
  }

  render() {
    return (
      <div className="homepage">
        {this.redirectHome()}
        <nav className="d-flex navbar p-0 pl-4 navbar-expand-sm navbar-light bg-light mb-5">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            <img src={arkaLogo}></img>
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item search-input">
                <form
                  className="form-inline md-form form-sm mt-0"
                  onSubmit={this.handleSearch}
                >
                  <FontAwesomeIcon
                    onClick={this.handleSearch}
                    icon={faSearch}
                  />
                  <input
                    className="form-control form-control-sm ml-3 mr-0"
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    aria-label="Search"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </form>
              </li>
              <li className="nav-item home-text">
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item profile-navbar mr-5">
                <a href="#" className="nav-link">
                  <img
                    className="profile-image mr-2"
                    src="https://source.unsplash.com/random"
                  />
                  Soultan
                </a>
              </li>
              <li className="nav-item divider ml-3 mr-5">
                <h1 className="text-secondary">|</h1>
              </li>
              <li className="nav-item chat-navbar">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon icon={faCommentDots} className="fa-lg" />
                </a>
              </li>
              <li className="nav-item notification-navbar">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon icon={faBell} className="fa-lg" />
                </a>
              </li>
              <li className="nav-item notification-navbar ml-5">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon onClick={this.handleRedirectHome} icon={faPowerOff} className="fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="filtering mb-5">
          <div className="skill-input">
            <form
              className="form-inline md-form form-sm mt-0"
              onSubmit={this.handleSearch}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="mr-3"
                onClick={this.handleSearch}
              />
              <input
                className="p-1"
                type="text"
                name="skill"
                placeholder="Search by skill"
                onChange={this.handleChange}
                value={this.state.skill}
              />
            </form>
          </div>
          <div>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.previousPage}>
                  &laquo;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {this.state.page}
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
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

          <div>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.limitMin}>
                  -
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  {this.state.limit}
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
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

          {/* <div className="limit-handle">
            <div className="limit-plus">
              <button onClick={this.limitPlus}>+</button>
            </div>
            <div>
              <p>{this.state.limit}</p>
            </div>
            <div className="limit-min">
              <button onClick={this.limitMin}>-</button>
            </div>
          </div> */}

          <div className="dropdown">
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
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
            </div>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Order
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                className="dropdown-item"
                onClick={this.handleSearch}
                onMouseEnter={this.handleOrder}
              >
                ASC
              </a>
              <a
                className="dropdown-item"
                onClick={this.handleSearch}
                onMouseEnter={this.handleOrder}
              >
                DESC
              </a>
            </div>
          </div>
        </div>
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
                        {`${engineer.success_rate || 0  }% Success Rate`}
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
