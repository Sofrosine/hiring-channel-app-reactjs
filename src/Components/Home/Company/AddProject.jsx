import React, {Component} from 'react'
import axios from 'axios'
import Navbar from '../../Navbar'


class AddProject extends Component {
  state = {
    data: [],
    profile: [],
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

  getProfile = e => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get(
        `http://localhost:5000/engineer/user/${this.props.match.params.userId}`,
        config
      )
      .then(result => {
        console.log(result);
        // console.log(result.data);
        const data = result.data;
        this.setState({
          ...this.state,
          profile: Object.values(data[0])
        });
        console.log(this.state.profile);
        // console.log(this.state.profile)
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateProject = async () => {
    
    axios({
      method: "patch",
      url: "http://localhost:5000/company/updateProject",
      params: {
        id_project: this.state.id_project,
        id_engineer: this.state.profile[7],
        status: 'Pending'
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
    
  };

  insertProject = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    const data = {
      id_project: this.state.id_project,
      id_engineer: this.state.profile[7]
    };
    axios
      .post("http://localhost:5000/company/insertProject", data, config)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

   hire = async () => {
    await this.updateProject()
    this.insertProject()
   }

  componentDidMount() {
    this.getStatus()
    this.getProfile();
  }


  render() {
    return (
      <>
        <section id="navbar-list" className="navbar-list">
          <Navbar/>
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

export default AddProject