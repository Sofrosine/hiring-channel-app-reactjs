import React, { Component } from "react";
import axios from "axios";
import "./EditSkill.css";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../Navbar";

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

    axios
      .post("http://localhost:5000/engineer/skill", data)
      .then(async result => {
        const swal = await Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your data has been inserted",
          showConfirmButton: false,
          timer: 1000
        });
        this.setState({
          ...this.state,
          oldSkill: "",
          newSkill: ""
        });
        console.log(result);

        this.getProfile()
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
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .delete(
        `http://localhost:5000/engineer/skill/${data.id_engineer}/${data.id_skill}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`
          }
        }
      )
      .then(async result => {
        const swal = await Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your data has been deleted",
          showConfirmButton: false,
          timer: 1000
        });
        this.setState({
          ...this.state,
          oldSkill: "",
          newSkill: ""
        });
        console.log(result);
        this.getProfile()
      })
      .catch(err => {
        console.log(err);
      });
  };

  listSkill = e => {
    axios
      .get("http://localhost:5000/skill")
      .then(result => {
        console.log(result);
        const data = result.data.data;
        this.setState({
          ...this.state,
          skillList: data
        });
        console.log(this.state.skillList);
      })
      .catch(err => {
        console.log(err);
      });
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
      .get("http://localhost:5000/engineer/profile", config)
      .then(result => {
        console.log(result);
        const data = result.data;
        this.setState({
          ...this.state,
          profile: Object.values(data[0])[8].split(",")
        });
        console.log("profile", this.state.profile);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteHandle = async () => {

  }

  componentDidMount() {
    this.listSkill();
    this.getProfile();
  }

  render() {
    return (
      <>
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
                            <a href="#" className="orange-text text-lighten-3" onMouseOver={() => {
                              this.setState({
                                ...this.state,
                                idSkill: skill.id
                              });
                              console.log(this.state.idSkill)
                            }} onClick={this.deleteSkill}>
                              <i class="material-icons">delete_sweep</i>
                            </a>
                          </td>
                        ) : (
                            <td><a onMouseOver={() => {
                              this.setState({
                                ...this.state,
                                idSkill: skill.id
                              });
                              console.log(this.state.idSkill)
                            }} onClick={this.insertSkill} href="#" className="orange-text text-lighten-5"><i class="material-icons">library_add</i></a></td>
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

        {/* <div className="formSkill">
          <div className="form-insert">
            <div className="text-input-skill">
              <p>Insert Skill</p>
            </div>
            <div className="form-input-skill">
              <input
                onChange={this.handleChange}
                type="number"
                name="newSkill"
                placeholder="Input your new id skill..."
                value={this.state.newSkill}
              />
            </div>
            <button onClick={this.insertSkill} className="btn btn-primary">
              Insert
            </button>
          </div>
          <div className="form-delete">
            <div className="text-delete-skill">
              <p>Delete Skill</p>
            </div>
            <div className="form-delete-skill">
              <input
                onChange={this.handleChange}
                type="number"
                name="oldSkill"
                placeholder="Input your old id skill..."
                value={this.state.oldSkill}
              />
            </div>
            <button onClick={this.deleteSkill} className="btn btn-danger">
              Delete
            </button>
          </div>

          <FontAwesomeIcon
            onClick={() => this.props.history.push("/engineer/home")}
            className="home-icon fa-lg"
            icon={faHome}
          />
        </div> */}
      </>
    );
  }
}

export default EditSkill;
