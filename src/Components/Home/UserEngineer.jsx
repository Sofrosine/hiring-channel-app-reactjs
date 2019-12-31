import React, { Component } from "react";
import axios from "axios";
import "./Engineer/EngineerProfile.css";
import './UserEngineer.css'
import Navbar from "../Navbar";
import Profile from "../HomeList/Profile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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
      .get(`http://localhost:5000/engineer/user/${this.props.match.params.userId}`, config)
      .then(result => {
        console.log(result);
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

  // redirectProject = () => {
  //   this.props
  // }

  componentDidMount() {
    this.getProfile()
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="profile-data">
          <FontAwesomeIcon className="back-home fa-lg" onClick={() => this.props.history.push('/company/home')} icon={faHome}/>
          <div id="profile-image">
            <Profile profile={this.state.profile} />
          </div>
          <table className="table table-dark table-bordered">
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
        <button onClick={() => this.props.history.push(`/user/${this.props.match.params.userId}/hire`)} className="hire-button btn btn-danger">Hire</button>
      </div>
    )
  }
}

export default UserEngineer