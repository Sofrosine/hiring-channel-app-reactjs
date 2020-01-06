import React, { Component } from "react";
import Swal from 'sweetalert2'
import Navbar from "../../Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectEngineer } from "../../../Redux/Actions/Engineer/Home/Project/getProjectEngineer";
import { updateProjectEngineer } from "../../../Redux/Actions/Engineer/Home/Project/updateProjectEngineer";
import { updateIsStatusEngineer1 } from "../../../Redux/Actions/Engineer/Home/Project/updateIsStatusEngineer1";
import { updateListProject } from "../../../Redux/Actions/Company/ListProject/updateListProject";
import { cancelListProject } from "../../../Redux/Actions/Company/ListProject/cancelListProject";

class EngineerProject extends Component {
  state = {
    data: [],
    id: "",
    is_accept: 1,
    id_project: "",
    id_engineer: "",
  };

  getStatus = async () => {
    try {
      await this.props.dispatch(getProjectEngineer());
      this.setState({
        ...this.state,
        data: Object.values(this.props.projectEngineer.data)
      });
      console.log(this.state.data)
    } catch(error) {
      console.log(error)
    }
  };

  updateStatus = async () => {
    try {
      this.props.dispatch(updateProjectEngineer(this.state.id, this.state.is_accept))
    } catch (error) {
      console.log(error)
    }    
    if (this.state.is_accept === 1) {
      try {
        this.props.dispatch(updateIsStatusEngineer1(this.state.id_project))
      } catch (error) {
        console.log(error)
      }
    }
  };

  redirectHomeEng = () => {
    if (this.props.homeEngineer) {
      return <Redirect to="/engineer/home" />;
    }
  };

  redirectProfileEng = () => {
    if (this.props.profileEngineer) {
      return <Redirect to="/engineer/profile" />;
    }
  };

  handleSent = async () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.value) {
        await Swal.fire(
          'Success!',
          'Your task has been sent',
          'success'
        )
        await this.updateStatus();
        window.location.reload()
      }
    })
    
  };

  noStatusProject = async () => {
    const id_project = this.state.id_project;
    const data = {
      status: "No Status"
    };
    await this.props.dispatch(updateListProject(data, id_project))
    this.getStatus()
  };

  cancelProject = async () => {
    await this.props.dispatch(cancelListProject(this.state.id_project, this.state.id_engineer))
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  componentDidMount() {
    this.getStatus();
  }

  render() {
    return (
      <>
        <section id="navbar-list" className="navbar-list">
          {this.redirectHomeEng()}
          {this.redirectProfileEng()}
          <div className="row">
            <div className="col s12">
              <Navbar />
            </div>
          </div>
        </section>
        <section id="project-list" className="project-list">
          <div className="container">
            <div className="row">
              <div className="col s12 center">
                <h1>Project Status</h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center">
                <table className="highlight centered responsive-table">
                  <thead>
                    <tr>
                      <th>Id Project</th>
                      <th>Owner</th>
                      <th>Project Name</th>
                      <th>Status</th>
                      <th>Send Project</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(data => {
                      return (
                        <tr>
                          <td>{data.id_project}</td>
                          <td>{data.Company}</td>
                          <td>{data.project_name}</td>
                          <td>
                            {data.status === "On Process" ? (
                              <p className="blue-text">{data.status}</p>
                            ) : (
                              <p className="green-text">{data.status}</p>
                            )}
                          </td>
                          <td>
                            {data.status === "Success" ? (
                              <p className="green-text">Sent</p>
                            ) : (
                              <>
                                  <a
                                    class="btn-floating btn-small pulse"
                                    onMouseOver={() =>
                                      this.setState({
                                        ...this.state,
                                        id: data.id,
                                        id_project: data.id_project
                                      })
                                    }
                                    onClick={this.handleSent}
                                  >
                                    <i class="material-icons">send</i>
                                  </a>
                                  <a
                                    class="btn-floating btn-small red pulse"
                                    onMouseOver={() =>
                                      this.setState({
                                        ...this.state,
                                        id: data.id,
                                        id_project: data.id_project,
                                        id_engineer: data.id_engineer
                                      })
                                    }
                                    onClick={this.cancel}
                                  >
                                    <i class="material-icons">cancel</i>
                                  </a>
                              </>
                            )}
                          </td>
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
    homeEngineer: state.redirectNavbar.homeEngineer,
    profileEngineer: state.redirectNavbar.profileEngineer,
    projectEngineer: state.getProjectEngineer.projectEngineer
  };
};

export default connect(mapStateToProps)(EngineerProject);
