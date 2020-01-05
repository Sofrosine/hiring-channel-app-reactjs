import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import "../Company/InsertDataCompany.css";
import Swal from "sweetalert2";
import { insertEngineer } from "../../../Redux/Actions/Engineer/insertEngineer";
import { connect } from "react-redux";

class InsertData extends Component {
  state = {
    Name: "",
    Description: "",
    Location: "",
    DateofBirth: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
    console.log(e.target.name, e.target.value);
  };

  handleSubmit = async e => {
    const data = {
      name: this.state.Name,
      description: this.state.Description,
      location: this.state.Location,
      dateofbirth: this.state.DateofBirth
    };
    e.preventDefault();
    await this.props.dispatch(insertEngineer(data));
    await Swal.fire({
      position: "middle",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    this.props.history.push("/engineer/home");
  };

  render() {
    return (
      <>
        <div id="insert-data-company" className="insert-data-company red lighten-2" style={{height: "100vh"}}>
          <section id="form-insert-company" className="form-insert-company">
            <div className="row">
              <div className="col s12 m-4">
                <h3 className="center">Input your valid data</h3>
                <div class="input-field">
                  <input
                    id="name_inline"
                    type="text"
                    class="validate"
                    name="Name"
                    onChange={this.handleChange}
                    required
                  />
                  <label for="name_inline">Name</label>
                </div>
                <div class="input-field">
                  <input
                    id="logo_inline"
                    type="text"
                    class="validate"
                    name="Description"
                    onChange={this.handleChange}
                  />
                  <label for="logo_inline">Description</label>
                </div>
                <div class="input-field">
                  <input
                    id="location_inline"
                    type="text"
                    class="validate"
                    name="Location"
                    onChange={this.handleChange}
                    required
                  />
                  <label for="location_inline">Location</label>
                </div>
                <div class="input-field">
                  <input
                    id="description_inline"
                    type="date"
                    class="validate"
                    name="DateofBirth"
                    onChange={this.handleChange}
                    required
                  />
                  <label for="description_inline">Date of Birth</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <a
                  class="waves-effect waves-light btn red lighten-2 white-text"
                  onClick={this.handleSubmit}
                >
                  button
                </a>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default connect()(InsertData);
