import React, { Component } from "react";
import axios from "axios";
import "./EngineerProfile.css";
import Navbar from "../../Navbar";
import Profile from "../../HomeList/Profile";
import BtnInsert from "../../../Assets/Button/BtnInsert";
import BtnUpdate from "../../../Assets/Button/BtnUpdate";
import BtnDelete from "../../../Assets/Button/BtnDelete";
import BtnSkill from "../../../Assets/Button/BtnSkill";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

class EngineerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: [], redirectHome: false };
  }

  getProfile = e => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get("http://localhost:5000/engineer/profile", config)
      .then(result => {
        console.log(result);
        const data = result.data;
        this.setState({
          ...this.state,
          profile: Object.values(data[0])
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDelete = async e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    const id_engineer = localStorage.getItem("id_engineer");
    const swal = await Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          axios
            .delete(`http://localhost:5000/engineer/${id_engineer}`, config)
            .then(result => {
              console.log(result);
              this.props.history.push("/");
              this.props.history.push("/engineer/home");
            })
            .catch(err => {
              console.log(err);
            });

          swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
  };

  redirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  checkToken = () => {
    if (!localStorage.getItem("id_engineer")) {
      return this.setState({
        ...this.state,
        redirectHome: true
      });
    }
  };

  componentWillMount() {
    this.checkToken();
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <div>
        {this.redirectHome()}
        <section id="navbar-list" className="navbar-list">
          <div className="row">
            <div className="col s12">
              <Navbar />
            </div>
          </div>
        </section>
        <section id="profile-data" className="profile-data">
          <div className="container">
            <div className="row">
              <div className="col s12 m6 center">
                  <Profile profile={this.state.profile} />
              </div>
              <div className="col s12 m6 d-flex flex-column align-self-center">
                <BtnInsert
                  onClick={() => this.props.history.push("/engineer/insert")}
                />
                <BtnUpdate
                  onClick={() => this.props.history.push("/engineer/update")}
                />
                {/* <BtnDelete onClick={this.handleDelete} /> */}
                <hr />
                <BtnSkill
                  onClick={() => this.props.history.push("/engineer/skill")}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default EngineerProfile;
