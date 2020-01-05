import React, { Component } from "react";
import M from "materialize-css";
import {connect} from 'react-redux'
import postCompany from "../../../Redux/Reducers/Company/postCompany";

class BtnInsertM extends Component {
  state = {
    Name: "",
    Logo: "",
    Location: "",
    Description: ""
  }
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  insertData = async () => {
    const data = {
      Name: this.state.Name,
      Logo: this.state.Logo,
      Location: this.state.Location,
      Description: this.state.Description
    }

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };

    await this.props.dispatch(postCompany(data,config))
    console.log(this.props.insertData)
  }
  render() {
    
    return (
      <>
        <a
          class="waves-effect waves-light btn modal-trigger orange ligthen-3 white-text"
          href="#modal1"
        >
          Insert
        </a>
        <div id="modal1" class="modal" style={{ width: "50%" }}>
          <form>
            <div class="modal-content">
              <div class="input-field inline">
                <input id="name_inline" type="text" class="validate" name="Name" onChange={this.handleOnChange} required/>
                <label for="name_inline">Name</label>
              </div>
              <div class="input-field inline">
                <input id="logo_inline" type="text" class="validate" name="Logo" onChange={this.handleOnChange} />
                <label for="logo_inline">Logo</label>
              </div>
              <div class="input-field inline">
                <input id="location_inline" type="text" class="validate" name="Location" onChange={this.handleOnChange} required />
                <label for="location_inline">Location</label>
              </div>
              <div class="input-field inline">
                <input id="description_inline" type="text" class="validate" name="Description" onChange={this.handleOnChange} required />
                <label for="description_inline">Description</label>
              </div>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat orange ligthen-3 white-text " onClick={this.insertData}>
                Insert
            </a>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    insertData: state.insertCompany.insertData
  }
}

export default connect(mapStateToProps)(BtnInsertM);
