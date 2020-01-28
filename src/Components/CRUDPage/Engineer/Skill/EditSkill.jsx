import React, { Component } from "react";
import axios from "axios";
import "./EditSkill.css";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { postSkill } from "../../../../Redux/Actions/Engineer/Edit Skill/postSkill";
import { deleteSkill } from "../../../../Redux/Actions/Engineer/Edit Skill/deleteSkill";
import { getSkill } from "../../../../Redux/Actions/Engineer/Edit Skill/getSkill";
import { getProfileSkill } from "../../../../Redux/Actions/Engineer/Edit Skill/getProfileSkill";

class EditSkill extends Component {
  state = {
    skillList: [],
    idSkill: "",
    profile: []
  };

  handleChange = e => {
    this.setState({
      idSkill: [e.target.value]
    });
  };

  insertSkill = e => {
    const id_engineer = localStorage.getItem("id_engineer");
    const data = {
      id_engineer: id_engineer,
      id_skill: Number(this.state.idSkill)
    };

    this.props
      .dispatch(postSkill(data))
      .then(async result => {
        await Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your data has been inserted",
          showConfirmButton: false,
          timer: 1000
        });
        this.getProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteSkill = e => {
    const id_engineer = localStorage.getItem("id_engineer");
    const data = {
      id_engineer: id_engineer,
      id_skill: this.state.idSkill
    };
    this.props
      .dispatch(deleteSkill(data.id_engineer, data.id_skill))
      .then(async result => {
        await Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your data has been deleted",
          showConfirmButton: false,
          timer: 1000
        });
        console.log("delete result", result);
        this.getProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  listSkill = async e => {
    await this.props.dispatch(getSkill());
    this.setState({
      skillList: this.props.skillData.data.data
    });
  };

  getProfile = async e => {
    await this.props.dispatch(getProfileSkill());
    const data = this.props.profileDataSkill.data
    if(Object.values(data[0])[8] !== null) {
      return this.setState({
        profile: Object.values(data[0])[9].split(",")
      });
    }
    
    
  };

  redirectProfileEng = () => {
    if (this.props.profileEngineer) {
      return <Redirect to="/engineer/profile" />;
    }
  };

  redirectHomeEng = () => {
    if (this.props.homeEngineer) {
      return <Redirect to="/engineer/home" />;
    }
  };

  componentDidMount() {
    this.listSkill();
    this.getProfile();
  }

  render() {
    return (
      <>
        {this.redirectProfileEng()}
        {this.redirectHomeEng()}
        <div className="row">
          <div className="col">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="col s12 m6 center">
              <h2>List of Skill</h2>
            </div>
            <div className="col s12 m6 center">
              <h2>Your Skill</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="col s12 m6">
              <table className="responsive-table highlight red accent-1 white-text">
                <thead>
                  <tr>
                    <th>Id </th>
                    <th>Skill Name</th>
                    <th>Option</th>
                  </tr>
                </thead>
                {this.state.skillList.map(skill => {
                  return (
                    <tbody>
                      <tr>
                        <td>{skill.id}</td>
                        <td>{skill.Skill}</td>
                        {this.state.profile.includes(skill.Skill) ? (
                          <td>
                            <a
                              href="#"
                              className="orange-text text-lighten-3"
                              onMouseOver={() => {
                                this.setState({
                                  ...this.state,
                                  idSkill: skill.id
                                });
                                console.log(this.state.idSkill);
                              }}
                              onClick={this.deleteSkill}
                            >
                              <i class="material-icons">delete_sweep</i>
                            </a>
                          </td>
                        ) : (
                          <td>
                            <a
                              onMouseOver={() => {
                                this.setState({
                                  ...this.state,
                                  idSkill: skill.id
                                });
                                console.log(this.state.idSkill);
                              }}
                              onClick={this.insertSkill}
                              href="#"
                              className="orange-text text-lighten-5"
                            >
                              <i class="material-icons">library_add</i>
                            </a>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <div className="col s12 m6">
              <table className="responsive-table highlight orange lighten-3 white-text center">
                <thead>
                  <tr>
                    <th>Skill Name</th>
                  </tr>
                </thead>
                {this.state.profile.map(skill => {
                  return (
                    <tbody>
                      <td className="center">{skill}</td>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeEngineer: state.redirectNavbar.homeEngineer,
    profileEngineer: state.redirectNavbar.profileEngineer,
    skillData: state.getSkill.skillData,
    profileDataSkill: state.getProfileSkill.profileDataSkill
  };
};

export default connect(mapStateToProps)(EditSkill);
