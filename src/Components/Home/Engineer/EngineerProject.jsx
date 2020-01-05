import React, { Component } from "react";
import Swal from 'sweetalert2'
import Navbar from "../../Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectEngineer } from "../../../Redux/Actions/Engineer/Home/Project/getProjectEngineer";
import { updateProjectEngineer } from "../../../Redux/Actions/Engineer/Home/Project/updateProjectEngineer";
import { updateIsStatusEngineer1 } from "../../../Redux/Actions/Engineer/Home/Project/updateIsStatusEngineer1";

class EngineerProject extends Component {
  state = {
    data: [],
    id: "",
    is_accept: 1,
    id_project: ""
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
