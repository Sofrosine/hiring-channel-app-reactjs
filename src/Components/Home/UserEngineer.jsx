import React, { Component } from "react";
import axios from "axios";
import "./Engineer/EngineerProfile.css";
import "./UserEngineer.css";
import Navbar from "../Navbar";
import Profile from "../HomeList/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProjectEngineer } from "../../Redux/Actions/Engineer/Home/Project/getProjectEngineer";
import { getTotalProject } from "../../Redux/Actions/Engineer/getTotalProject";
import Swal from "sweetalert2";

class UserEngineer extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  getProfile = e => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get(
        `http://localhost:5000/engineer/user/${this.props.match.params.userId}`,
        config
      )
      // .get(
      //   `https://hiring-channel-application.herokuapp.com/engineer/user/${this.props.match.params.userId}`,
      //   config
      // )
      .then(result => {
        console.log('result data',result);
        // console.log(result.data);
        const data = result.data;
        this.setState({
          ...this.state,
          profile: Object.values(data[0])
        });
        console.log(this.state.profile);
        // console.log(this.state.profile)
      })
      .catch(err => {
        console.log(err);
      });
  };

  redirectHomeCompany = () => {
    if (this.props.homeCompany) {
      return <Redirect to="/company/home" />;
    }
  };

  hire = async () => {
    await this.props.dispatch(getTotalProject(this.props.match.params.userId))
    const totalProject = await this.props.totalProject.data.data
    if(totalProject.length >= 2) {
      Swal.fire({
        text: `Engineer's Project is on maximum value!`,
        icon: `error`
      })
    } else {
      this.props.history.push(
        `/user/${this.props.match.params.userId}/hire`
      )
    }
  }

  

  async componentDidMount() {
    this.getProfile()
  }

  render() {
    return (
      <div>
        {this.redirectHomeCompany()}
        <Navbar />
        <div className="container">
          <div className="profile-data">
            <div className="row">
              <div id="profile-image" className="col s12 m6">
                <div className="position-relative">
                  <Profile profile={this.state.profile} />
                </div>
              </div>
              <div id="table-profile" className="table-profile col s12 m6">
                <table className="table red lighten-2 white-text table-bordered mt-5">
                  <tbody>
                    <tr>
                      <th scope="row">Id</th>
                      <td>{this.state.profile[7]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{this.state.profile[1]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td>{this.state.profile[2]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Skill</th>
                      <td>{this.state.profile[8]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Location</th>
                      <td>{this.state.profile[3]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Date of Birth</th>
                      <td>{this.state.profile[4]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Date Created</th>
                      <td>{this.state.profile[5]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div id="hire-profile" className="hire-profile col s12 center">
                <button
                  onClick={this.hire}
                  className="hire-button btn btn-danger w-50"
                >
                  Hire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeCompany: state.redirectNavbar.homeCompany,
    // profileCompany: state.redirectNabar.prfileCompany
    projectEngineer : state.getProjectEngineer.projectEngineer,
    totalProject: state.getTotalProject.totalProject
  };
};

export default connect(mapStateToProps)(UserEngineer);
