import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "../../Navbar";

class EngineerProject extends Component {
  state = {
    data: [],
    id: "",
    is_accept: 1,
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
      .get("http://localhost:5000/engineer/project", config)
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
    if (this.state.is_accept === 1) {
      axios({
        method: "patch",
        url: `http://localhost:5000/company/project/${this.state.id_project}`,
        params: {
          status: "Success"
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
  handleSent = async () => {
    const updateProject = await this.updateStatus();
    this.getStatus();
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

export default EngineerProject;
