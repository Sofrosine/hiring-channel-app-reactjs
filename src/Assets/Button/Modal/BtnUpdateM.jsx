import React, { Component } from "react";
import M from "materialize-css";
import {connect} from 'react-redux'
import { updateCompany } from "../../../Redux/Actions/Company/updateCompany";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { getCompany } from "../../../Redux/Actions/Company/getCompany";

class BtnUpdateM extends Component {
  state = {
    Name: "",
    Description: "",
    Location: "",
    Logo: "",
    originalName: "",
    originalDesc: "",
    originalLocation: "",
    originalLogo: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
    console.log(e.target.name, e.target.value);
  };

  handleUpdate = async () => {
    const data = {
      Name: this.state.Name === "" ? this.state.originalName : this.state.Name,
      Description: this.state.Description === "" ? this.state.originalDesc : this.state.Description,
      Location: this.state.Location === "" ? this.state.originalLocation : this.state.Location,
      Logo: this.state.Logo === "" ? this.state.originalLogo : this.state.Logo
    }
    await this.props.dispatch(updateCompany(data))
    await Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Your update has been saved',
      showConfirmButton: false,
      timer: 1000
    })
    window.location.reload();
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    await this.props.dispatch(getCompany(config));
    const data = this.props.companyData
    this.setState({
      originalName: data.Name,
      originalDesc: data.Description,
      originalLocation: data.Location,
      originalLogo: data.Logo
    })
  }

  render() {
    return (
      <>
        <a
          class="waves-effect waves-light btn modal-trigger ml-2 yellow darken-2 white-text"
          href="#modal1"
        >
          Update
        </a>
        <div id="modal1" class="modal" style={{ width: "50%" }}>
          <form>
            <div class="modal-content">
              <div class="input-field inline">
                <input
                  id="name_inline"
                  type="text"
                  class="validate"
                  name="Name"
                  onChange={this.handleChange}
                />
                <label for="name_inline">Name</label>
              </div>
              <div class="input-field inline">
                <input
                  id="logo_inline"
                  type="text"
                  class="validate"
                  name="Logo"
                  onChange={this.handleChange}
                />
                <label for="logo_inline">Logo</label>
              </div>
              <div class="input-field inline">
                <input
                  id="location_inline"
                  type="text"
                  class="validate"
                  onChange={this.handleChange}
                  name="Location"
                />
                <label for="location_inline">Location</label>
              </div>
              <div class="input-field inline">
                <input
                  id="description_inline"
                  type="text"
                  class="validate"
                  onChange={this.handleChange}
                  name="Description"
                />
                <label for="description_inline">Description</label>
              </div>
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close waves-effect waves-green btn-flat yellow darken-2 white-text"
                onClick={this.handleUpdate}
              >
                Update
              </a>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reloadProfile: state.updateCompany.reloadProfile,
    companyData: state.getCompany.companyData
  }
}

export default connect(mapStateToProps)(BtnUpdateM);
