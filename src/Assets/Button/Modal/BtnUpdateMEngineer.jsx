import React, { Component } from "react";
import M from "materialize-css";
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import { updateEngineer } from "../../../Redux/Actions/Engineer/updateEngineer";
import { getEngineer } from "../../../Redux/Actions/Engineer/getEngineer";

class BtnUpdateM extends Component {
  state = {
    Name: "",
    Description: "",
    Location: "",
    DateofBirth: "",
    originalName: "",
    originalDesc: "",
    originalLocation: "",
    originalDOB: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
    console.log(e.target.name, e.target.value);
  };

  handleUpdate = async () => {
    const data = {
      name: this.state.Name === "" ? this.state.originalName : this.state.Name,
      description: this.state.Description === "" ? this.state.originalDesc : this.state.Description,
      location: this.state.Location === "" ? this.state.originalLocation : this.state.Location,
      dateofbirth: this.state.DateofBirth === "" ? this.state.originalDOB : this.state.DateofBirth
    }
    console.log('data1', data)
    await this.props.dispatch(updateEngineer(data))
    console.log('data2', data)
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
    await this.props.dispatch(getEngineer())
    const data = this.props.profileEngineer.data[0]
    this.setState({
      originalName: data.Name,
      originalDesc: data.Description,
      originalLocation: data.Location,
      originalDOB: data.DateofBirth.slice(0,10)
    })
  }

  render() {
    return (
      <>
        <a
          class="mr-2 waves-effect waves-light btn modal-trigger ml-2 yellow darken-2 white-text"
          href="#modal2"
        >
          Update
        </a>
        <div id="modal2" class="modal" style={{ width: "50%" }}>
          <form>
            <div class="modal-content">
              <div class="input-field inline">
                <input
                  id="name_inline"
                  type="text"
                  class="validate"
                  name="Name"
                  onChange={this.handleChange}
                  // value={this.props.profile[1]}
                />
                <label for="name_inline">Name</label>
              </div>
              <div class="input-field inline">
                <input
                  id="logo_inline"
                  type="text"
                  class="validate"
                  name="Description"
                  // value={this.props.profile[2]}
                  onChange={this.handleChange}
                />
                <label for="logo_inline">Description</label>
              </div>
              <div class="input-field inline">
                <input
                  id="location_inline"
                  type="text"
                  class="validate"
                  onChange={this.handleChange}
                  // value={this.props.profile[3]}
                  name="Location"
                />
                <label for="location_inline">Location</label>
              </div>
              <div class="input-field inline">
                <input
                  id="description_inline"
                  type="date"
                  class="validate"
                  onChange={this.handleChange}
                  // value={this.props.profile[4]}
                  name="DateofBirth"
                />
                <label for="description_inline">Date of Birth</label>
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
    profileEngineer: state.getEngineer.profileEngineer
  }
}

export default connect(mapStateToProps)(BtnUpdateM);
