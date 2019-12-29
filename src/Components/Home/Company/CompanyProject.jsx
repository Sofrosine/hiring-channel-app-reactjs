import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";

class CompanyProject extends Component {
  state = {
    data: []
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
      .get("http://localhost:5000/company/project", config)
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

  componentDidMount() {
    this.getStatus();
  }

  render() {
    return (
      <section id="project-list-company" className="project-list-company">
        <div className="container">
          <div className="row">
            <div className="col s12 center">
              <table className="highlight centered responsive-table">
                <thead>
                  <th>Id Project</th>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Engineer Name</th>
                </thead>
                <tbody>
                  {this.state.data.map(data => {
                    return (
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.project_name}</td>
                        {data.status === 'Success' ? <td className="green-text">{data.status}</td>: 
                        <>
                            {data.status === 'On Process' ? <td className="blue-text">{data.status}</td> : <td className="red-text">{data.status}</td>}
                        </>}
                        <td>{data.Engineer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CompanyProject;
