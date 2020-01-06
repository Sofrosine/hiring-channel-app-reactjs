import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import Navbar from "../../Navbar";
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CompanyProject extends Component {
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
      // .get("http://localhost:5000/company/project", config)
      .get("https://hiring-channel-application.herokuapp.com/company/project", config)
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

  handleProject = e => {
    this.setState({
      ...this.state,
      project_name: e.target.value
    });
    console.log(this.state.project_name);
  };

  addProject = () => {
    const id_company = localStorage.getItem("id_company");
    const data = {
      project_name: this.state.project_name,
      id_company: id_company
    };
    axios
      // .post("http://localhost:5000/company/addProject", data, {
      //   headers: {
      //     Authorization: `Bearer ${JSON.parse(
      //       localStorage.getItem("accessToken")
      //     )}`
      //   }
      // })
      .post("https://hiring-channel-application.herokuapp.com/company/addProject", data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
      .then(result => {
        console.log(result);
        Swal.fire({
          title: "Data Inserted",
          icon: "success"
        });
        this.setState({
          ...this.state,
          project_name: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
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
              <h1>Project Progress</h1>
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
                    <th>Engineer Name</th>
                  </thead>
                  <tbody>
                    {this.state.data.map(data => {
                      return (
                        <tr>
                          <td>{data.id}</td>
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
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeCompany: state.redirectNavbar.homeCompany,
    profileCompany: state.redirectNavbar.profileCompany
  };
};

export default connect(mapStateToProps)(CompanyProject);
