import React, { Component } from "react";
import Swal from "sweetalert2";
import "./InsertDataCompany.css";
import {connect} from 'react-redux'
import { postCompany } from "../../../Redux/Actions/Company/postCompany";
import {Redirect} from 'react-router-dom'

class InsertDataCompany extends Component {
  state = {
    Name: "",
    Logo: "",
    Location: "",
    Description: "",
    redirectHome: false
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
    console.log(e.target.name, e.target.value)
  }

  insertData = async () => {
    const data = {
      name: this.state.Name,
      logo: this.state.Logo,
      location: this.state.Location,
      description: this.state.Description,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };

    await this.props.dispatch(postCompany(data,config))
    await Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Data Inserted',
      showConfirmButton: false,
      timer: 1000
    })
    this.setState({
      redirectHome: true
    })
  }

  redirectHome = () => {
    if(this.state.redirectHome) {
      return <Redirect to="/company/home" />
    }
  }

  render() {
    return (
      <>
      {this.redirectHome()}
        <div id="insert-data-company" className="insert-data-company red lighten-2" style={{ height: "100vh" }}>
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
                    onChange={this.handleOnChange}
                    required
                  />
                  <label for="name_inline">Name</label>
                </div>
                <div class="input-field">
                  <input
                    id="logo_inline"
                    type="text"
                    class="validate"
                    name="Logo"
                    onChange={this.handleOnChange}
                  />
                  <label for="logo_inline">Logo</label>
                </div>
                <div class="input-field">
                  <input
                    id="location_inline"
                    type="text"
                    class="validate"
                    name="Location"
                    onChange={this.handleOnChange}
                    required
                  />
                  <label for="location_inline">Location</label>
                </div>
                <div class="input-field">
                  <input
                    id="description_inline"
                    type="text"
                    class="validate"
                    name="Description"
                    onChange={this.handleOnChange}
                    required
                  />
                  <label for="description_inline">Description</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <a class="waves-effect waves-light btn red lighten-2 white-text" onClick={this.insertData}>button</a>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    redirectHome: state.postCompany.redirectHome
  };
};

export default connect(mapStateToProps)(InsertDataCompany);
