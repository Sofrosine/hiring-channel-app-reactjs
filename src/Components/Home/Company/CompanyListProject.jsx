import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "../../Navbar";
import Swal from 'sweetalert2'

class CompanyListProject extends Component {
  state = {
    data: [],
    project_name: ""
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
      .get("http://localhost:5000/company/getProject", config)
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

  handleProject = (e) => {
    this.setState({
      ...this.state,
      project_name: e.target.value
    })
    console.log(this.state.project_name)
  }

  addProject = () => {
    const id_company = localStorage.getItem("id_company");
    const data = {
      project_name: this.state.project_name,
      id_company: id_company
    }
    axios
      .post('http://localhost:5000/company/addProject', data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getStatus();
    M.AutoInit();

  }

  render() {
    return (
      <>
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
                        <input value={this.state.project_name} onChange={this.handleProject} id="icon_prefix" type="text" class="validate" required />
                        <label for="icon_prefix">Project Name</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 center">
                        <a onClick={this.addProject} class="waves-effect waves-light btn red lighten-1 white-text">Add</a>
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

export default CompanyListProject;
