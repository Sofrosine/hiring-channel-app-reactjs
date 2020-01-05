import React, { Component } from "react";
import Swal from 'sweetalert2'
import Navbar from "../../Navbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateEngineerHome } from "../../../Redux/Actions/Engineer/Home/updateEngineerHome";
import { deleteEngineerHome } from "../../../Redux/Actions/Engineer/Home/deleteEngineerHome";
import { getStatusEngineer } from "../../../Redux/Actions/Engineer/Home/Status/getStatusEngineer";
import { updateStatusEngineer } from "../../../Redux/Actions/Engineer/Home/Status/updateStatusEngineer";
import { updateIsStatusEngineer0 } from "../../../Redux/Actions/Engineer/Home/Status/updateIsStatusEngineer0";
import { updateIsStatusEngineer2 } from "../../../Redux/Actions/Engineer/Home/Status/updateIsStatusEngineer2";

class EngineerHome extends Component {
  state = {
    data: [],
    approved: false,
    rejected: false,
    confirmButton: true,
    is_accept: "",
    id: "",
    id_project: "",
    id_engineer: ""
  };

  updateProject = async () => {
    try {
      const body = {
        status: "No Status"
      };
      const update = await this.props.dispatch(
        updateEngineerHome(this.state.id_project, body)
      );
      console.log(update);
      this.getStatus();
    } catch (error) {
      console.log(error);
    }
  };

  cancelProject = async () => {
    try {
      this.props.dispatch(
        deleteEngineerHome(this.state.id_project, this.state.id_engineer)
      );
    } catch (error) {
      console.log(error);
    }
  };

  getStatus = async () => {
    try {
      const status = await this.props.dispatch(getStatusEngineer());
      console.log(status);
      this.setState({
        ...this.state,
        data: Object.values(this.props.statusEngineer.data)
      });
    } catch (error) {
      console.log("oops", error);
    }
  };

  updateStatus = async () => {
    try {
      this.props.dispatch(
        updateStatusEngineer(this.state.id, this.state.is_accept)
      );
    } catch (error) {
      console.log(error);
    }
    if (this.state.is_accept === 0) {
      try {
        this.props.dispatch(updateIsStatusEngineer0(this.state.id_project));
      } catch (error) {
        console.log(error);
      }
    } else if (this.state.is_accept === 2) {
      try {
        this.props.dispatch(updateIsStatusEngineer2(this.state.id_project));
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleReject = async e => {
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
          'The offer has been rejected!',
          'success'
        )
        const updateAccept = await this.setState({
          ...this.state,
          confirmButton: false,
          rejected: true,
          is_accept: 0
        });
        this.reject();
      }
    })
    
    
  };

  handleApprove = async e => {
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
          'Your offer has been sent',
          'success'
        )
        const updateAccept = await this.setState({
          ...this.state,
          confirmButton: false,
          rejected: false,
          is_accept: 2
        });
        await this.updateStatus();
        window.location.reload()
      }
    })
    
  };

  reject = async () => {
    await this.cancelProject();
    this.updateProject();
  };

  redirectProfileEng = () => {
    if (this.props.profileEngineer) {
      return <Redirect to="/engineer/profile" />;
    }
  };

  componentDidMount() {
    this.getStatus();
  }

  render() {
    return (
      <>
        {this.redirectProfileEng()}
        <section id="navbar-list" className="navbar-list">
          <div className="row">
            <div className="col s12">
              <Navbar />
            </div>
          </div>
        </section>
        <section id="mail-list" className="mail-list">
          <div className="container">
            <div className="row">
              <div className="col s12 center">
                <h1>Project In</h1>
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
                      <th>Approval</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {/* {this.state.data.map(data => {
                    <h1>data.Company</h1>
                  })} */}
                  <tbody>
                    {this.state.data.map(data => {
                      return (
                        <tr>
                          <td>{data.id_project}</td>
                          <td>{data.Company}</td>
                          <td>{data.project_name}</td>
                          <td>
                            {data.status === "On Process" ||
                            data.status === "Success" ? (
                              <p className="green-text">Approved</p>
                            ) : (
                          
                                  <>
                                    <a
                                      class="btn-floating btn-medium pulse"
                                      onMouseOver={() =>
                                        this.setState({
                                          ...this.state,
                                          id: data.id,
                                          id_project: data.id_project
                                        })
                                      }
                                      onClick={this.handleApprove}
                                    >
                                      <i class="material-icons">check</i>
                                    </a>
                                    <a
                                      class="btn-floating btn-medium pulse red"
                                      onMouseOver={() =>
                                        this.setState({
                                          ...this.state,
                                          id: data.id,
                                          id_project: data.id_project,
                                          id_engineer: data.id_engineer
                                        })
                                      }
                                      onClick={this.handleReject}
                                    >
                                      <i class="material-icons">close</i>
                                    </a>
                                  </>
                               
                              
                            )}
                          </td>
                          <td>
                            {data.status === "On Process" ? (
                              <p className="blue-text">{data.status}</p>
                            ) : (
                              <>
                                {data.status === "Success" ? (
                                  <p className="green-text">{data.status}</p>
                                ) : (
                                  <p className="red-text">{data.status}</p>
                                )}
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
            <div className="row">
              <div className="col s12 center">
                <a
                  onClick={() => this.props.history.push("/engineer/project")}
                  className="waves-effect waves-light btn red lighten-1 white-text"
                >
                  {" "}
                  Go To Project Status
                </a>
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
    updateHomeEngineer: state.updateEngineerHome.updateHomeEngineer,
    statusEngineer: state.getStatusEngineer.statusEngineer
  };
};

export default connect(mapStateToProps)(EngineerHome);
