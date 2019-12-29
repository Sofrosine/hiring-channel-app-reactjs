import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "../../Navbar";

class EngineerHome extends Component {
  state = {
    data: [],
    approved: false,
    rejected: false,
    confirmButton: true,
    is_accept: "",
    id: "",
    id_project: ""
  };

  getStatus = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };

    axios
      .get("http://localhost:5000/engineer/status", config)
      .then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
          ...this.state,
          data: Object.values(data)
        });
        console.log("data", this.state.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateStatus = () => {
    axios({
      method: "patch",
      url: `http://localhost:5000/engineer/status/${this.state.id}`,
      params: {
        is_accept: this.state.is_accept
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    if (this.state.is_accept === 0) {
      axios({
        method: "patch",
        url: `http://localhost:5000/company/project/${this.state.id_project}`,
        params: {
          status: "Pending"
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.state.is_accept === 2) {
      axios({
        method: "patch",
        url: `http://localhost:5000/company/project/${this.state.id_project}`,
        params: {
          status: "On Process"
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleReject = async e => {
    const updateAccept = await this.setState({
      ...this.state,
      confirmButton: false,
      rejected: true,
      is_accept: 0
    });
    this.updateStatus();
  };
  handleApprove = async e => {
    const updateAccept = await this.setState({
      ...this.state,
      confirmButton: false,
      rejected: false,
      is_accept: 2
    });
    this.updateStatus();
  };

  componentDidMount() {
    this.getStatus();
  }

  render() {
    return (
      <>
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
                                {this.state.confirmButton === true ? (
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
                                          id_project: data.id_project
                                        })
                                      }
                                      onClick={this.handleReject}
                                    >
                                      <i class="material-icons">close</i>
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    {this.state.rejected === true ? (
                                      <p className="red-text">Rejected</p>
                                    ) : (
                                      <p className="green-text">Approved</p>
                                    )}
                                  </>
                                )}
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
                  className="waves-effect waves-light btn blue white-text"
                >
                  {" "}
                  Go To Project Status
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center">
                <a
                  onClick={() => this.props.history.push("/engineer/profile")}
                  className="waves-effect waves-light btn green white-text"
                >
                  {" "}
                  Go To Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default EngineerHome;
