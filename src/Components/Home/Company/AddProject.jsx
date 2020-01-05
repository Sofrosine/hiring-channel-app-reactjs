import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../Navbar";
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getListProject } from "../../../Redux/Actions/Company/ListProject/getListProject";
import { getProfileAddProject } from "../../../Redux/Actions/Company/AddProject/getProfileAddProject";
import { updateAddProject } from "../../../Redux/Actions/Company/AddProject/updateAddProject";
import { insertAddProject } from "../../../Redux/Actions/Company/AddProject/insertAddProject";

class AddProject extends Component {
  state = {
    data: [],
    profile: [],
    id_project: ""
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

  getProfile = async () => {
    await this.props.dispatch(
      getProfileAddProject(this.props.match.params.userId)
    );
    this.setState({
      ...this.state,
      profile: Object.values(this.props.profileData.data[0])
    });
  };

  updateProject = async () => {
    try {
      const data = {
        id_project: this.state.id_project,
        id_engineer: this.state.profile[7],
        status: "Pending"
      };
      this.props.dispatch(updateAddProject(data));
    } catch (error) {
      console.log(error);
    }
  };

  insertProject = async () => {
    try {
      const data = {
        id_project: this.state.id_project,
        id_engineer: this.state.profile[7]
      };
      this.props.dispatch(insertAddProject(data));
    } catch (error) {
      console.log(error);
    }
  };

  redirectHomeCompany = () => {
    if (this.props.homeCompany) {
      return <Redirect to="/company/home" />;
    }
  };

  hire = async () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then( async (result) => {
      if (result.value) {
        await Swal.fire(
          'Success!',
          'Your offer has been sent',
          'success'
        ) 
        await this.updateProject();
        await this.insertProject();
        window.location.reload()
      }
    })
    
  };

  componentDidMount() {
    this.getStatus();
    this.getProfile();
  }

  render() {
    return (
      <>
        {this.redirectHomeCompany()}
        <section id="navbar-list" className="navbar-list">
          <Navbar />
        </section>
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
                                <>
                                  {data.status === "Pending" ? (
                                    <td className="red-text">{data.status}</td>
                                  ) : (
                                    <td>{data.status}</td>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {data.id_engineer === null ? (
                            <td>
                              <a
                                onMouseOver={() =>
                                  this.setState({
                                    ...this.state,
                                    id_project: data.id_project
                                  })
                                }
                                class="btn-floating btn-small green pulse"
                                onClick={this.hire}
                              >
                                <i class="material-icons">add</i>
                              </a>
                            </td>
                          ) : (
                            <td>-</td>
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
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeCompany: state.redirectNavbar.homeCompany,
    // profileCompany: state.redirectNabar.prfileCompany
    projectList: state.getListProject.projectList,
    profileData: state.getProfileAddProject.profileData
  };
};

export default connect(mapStateToProps)(AddProject);
