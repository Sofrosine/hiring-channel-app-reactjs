import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "../../Navbar";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getListProject } from "../../../Redux/Actions/Company/ListProject/getListProject";
import { postListProject } from "../../../Redux/Actions/Company/ListProject/postListProject";
import { updateListProject } from "../../../Redux/Actions/Company/ListProject/updateListProject";
import { cancelListProject } from "../../../Redux/Actions/Company/ListProject/cancelListProject";
import { deleteListProject } from "../../../Redux/Actions/Company/ListProject/deleteListProject";

class CompanyListProject extends Component {
  state = {
    data: [],
    project_name: "",
    id_project: "",
    id_engineer: ""
  };

  getStatus = async () => {
    try {
      await this.props.dispatch(getListProject());
      this.setState({
        ...this.state,
        data: Object.values(this.props.projectList.data)
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleProject = e => {
    this.setState({
      ...this.state,
      project_name: e.target.value
    });
    console.log(this.state.project_name);
  };

  addProject = async () => {
    try {
      const id_company = localStorage.getItem("id_company");
      const data = {
        project_name: this.state.project_name,
        id_company: id_company
      };
      await this.props
        .dispatch(postListProject(data))
        .then(
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Your project has been added",
            showConfirmButton: false,
            timer: 1000
          })
        )
        .then(window.location.reload());
    } catch (error) {
      console.log(error);
    }
  };

  noStatusProject = async () => {
    const id_project = this.state.id_project;
    const data = {
      status: "No Status"
    };
    await this.props.dispatch(updateListProject(data,id_project))
    this.getStatus()
  };

  cancelProject = async () => {
    await this.props.dispatch(cancelListProject(this.state.id_project,this.state.id_engineer))
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteProject = async () => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        await this.props.dispatch(deleteListProject(this.state.id_project))
        this.getStatus()
      }
    })
    
  }

  cancel = async () => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
       if (result.value) {
        await this.cancelProject();
        this.noStatusProject();
      }
    })
    
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

  componentDidMount() {
    this.getStatus();
    M.AutoInit();
  }

  render() {
    return (
      <>
        {this.redirectHomeProfile()}
        {this.redirectHomeCompany()}
        <Navbar />
        <div className="row">
          <div className="container">
            <div className="col center">
              <hr />
              <h1>Project List</h1>
              <hr />
            </div>
          </div>
        </div>
        <section id="project-list-company" className="project-list-company">
          <div className="container">
            <div className="row">
              <div className="col s12 center">
                <table className="highlight centered responsive-table">
                  <thead>
                    <th>Id Project</th>
                    <th>Project Name</th>
                    <th>Status</th>
                    <th>Option</th>
                  </thead>
                  <tbody>
                    {this.state.data.map(data => {
                      return (
                        <tr>
                          <td>{data.id_project}</td>
                          <td>{data.project_name}</td>
                          {data.status === "Success" ? (
                            <td className="green-text">{data.status}</td>
                          ) : (
                            <>
                              {data.status === "On Process" ? (
                                <td className="blue-text">{data.status}</td>
                              ) : (
                                <td className="red-text">{data.status}</td>
                              )}
                            </>
                          )}
                          {data.status === "Success" ? (
                            <td>
                              <i class="material-icons">check</i>
                            </td>
                          ) : (
                            <>
                              {data.status === "On Process" ||
                              data.status === "Pending" ? (
                                <td
                                  onMouseOver={() => {
                                    this.setState({
                                      ...this.state,
                                      id_project: data.id_project,
                                      id_engineer: data.id_engineer
                                    });
                                  }}
                                  onClick={this.cancel}
                                >
                                  <a class="waves-effect waves-light btn orange lighten-3 white-text">
                                    Cancel
                                  </a>
                                </td>
                              ) : (
                                <td
                                  onMouseOver={() =>
                                    this.setState({
                                      ...this.state,
                                      id_project: data.id_project
                                    })
                                  }
                                  onClick={this.deleteProject}
                                >
                                  <a class="waves-effect waves-light btn red accent-2 white-text">
                                    Delete
                                  </a>
                                </td>
                              )}
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section id="add-project" className="add-project">
          <div className="row">
            <div className="container">
              <div className="col">
                <a
                  class="waves-effect waves-light btn modal-trigger red lighten-1 white-text"
                  href="#modal1"
                >
                  Add Project
                </a>

                <div id="modal1" class="modal bottom-sheet">
                  <div class="modal-content">
                    <div className="row">
                      <div className="input-field col s12">
                        <i class="material-icons prefix">work</i>
                        <input
                          value={this.state.project_name}
                          onChange={this.handleProject}
                          id="icon_prefix"
                          type="text"
                          class="validate"
                          required
                        />
                        <label for="icon_prefix">Project Name</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 center">
                        <a
                          onClick={this.addProject}
                          class="waves-effect waves-light btn red lighten-1 white-text"
                        >
                          Add
                        </a>
                      </div>
                    </div>
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
    homeCompany: state.redirectNavbar.homeCompany,
    profileCompany: state.redirectNavbar.profileCompany,
    projectList: state.getListProject.projectList
  };
};

export default connect(mapStateToProps)(CompanyListProject);
