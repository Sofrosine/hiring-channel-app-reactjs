import React, { Component } from "react";
import axios from "axios";
import "./EditSkill.css";
import { Table } from "react-bootstrap";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class EditSkill extends Component {
  state = {
    skillList: [],
    oldSkill: "",
    newSkill: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
    console.log("oldSkill", this.state.oldSkill);
    console.log("newSkill", this.state.newSkill);
  };

  insertSkill = e => {
    const id_engineer = localStorage.getItem("id_engineer");
    const data = {
      id_engineer: id_engineer,
      id_skill: Number(this.state.newSkill)
    };

    axios
      .post("http://localhost:5000/engineer/skill", data)
      .then(async result => {
        const swal = await Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Your data has been inserted',
          showConfirmButton: false,
          timer: 1000
        })
        this.setState({
          ...this.state,
          oldSkill: '',
          newSkill: ''
        })
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteSkill = e => {
    const id_engineer = localStorage.getItem("id_engineer");
    const data = {
      id_engineer: id_engineer,
      id_skill: this.state.oldSkill
    };
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .delete(`http://localhost:5000/engineer/skill/${data.id_engineer}/${data.id_skill}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
      .then(async result => {
        const swal = await Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Your data has been deleted',
          showConfirmButton: false,
          timer: 1000
        })
        this.setState({
          ...this.state,
          oldSkill: '',
          newSkill: ''
        })
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  listSkill = e => {
    axios
      .get("http://localhost:5000/skill")
      .then(result => {
        console.log(result);
        const data = result.data.data;
        this.setState({
          ...this.state,
          skillList: data
        });
        console.log(this.state.skillList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.listSkill();
  }

  render() {
    return (
      <div className="editSkill">
        <div className="tableSkill">
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id </th>
                <th>Skill Name</th>
              </tr>
            </thead>
            {this.state.skillList.map(skill => {
              return (
                <tbody>
                  <tr>
                    <td>{skill.id}</td>
                    <td>{skill.Skill}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
        <div className="formSkill">
          <div className="form-insert">
            <div className="text-input-skill">
              <p>Insert Skill</p>
            </div>
            <div className="form-input-skill">
              <input
                onChange={this.handleChange}
                type="number"
                name="newSkill"
                placeholder="Input your new id skill..."
                value={this.state.newSkill}
              />
            </div>
            <button onClick={this.insertSkill} className="btn btn-primary">
              Insert
            </button>
          </div>
          <div className="form-delete">
            <div className="text-delete-skill">
              <p>Delete Skill</p>
            </div>
            <div className="form-delete-skill">
              <input
                onChange={this.handleChange}
                type="number"
                name="oldSkill"
                placeholder="Input your old id skill..."
                value={this.state.oldSkill}
              />
            </div>
            <button onClick={this.deleteSkill} className="btn btn-danger">Delete</button>
          </div>
          
          <FontAwesomeIcon onClick={() => this.props.history.push('/engineer/home')} className="home-icon fa-lg" icon={faHome} />
        </div>
        
      </div>
    );
  }
}

export default EditSkill;
