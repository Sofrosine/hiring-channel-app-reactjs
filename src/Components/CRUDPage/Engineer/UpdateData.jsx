import React, { Component } from "react";
import axios from 'axios'
import { Form, Button, Card } from "react-bootstrap";
import Swal from 'sweetalert2'

class UpdateData extends Component {
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

  handleSubmit = (e) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };

    const data = {
      name: this.state.Name,
      description: this.state.Description,
      location: this.state.Location,
      dateofbirth: this.state.DateofBirth
    }
    e.preventDefault()
    axios ({
      method: "patch",
      url: "http://localhost:5000/engineer",
      params: {
        name: this.state.Name,
        description: this.state.Description,
        location: this.state.Location,
        dateofbirth: this.state.DateofBirth
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
      .then(async result => {
        console.log(result)
        console.log(result.config.data)
        const swal = await Swal.fire({
          title: "Success",
          text: "Data updated",
          icon: "success"
        });
        this.props.history.push('/engineer/profile')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Card body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="Name"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="Description"
              placeholder="Enter Description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="Location"
              placeholder="Enter Location"
            />
          </Form.Group>

          <Form.Group controlId="formBasicDateofBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="date"
              name="DateofBirth"
              placeholder="Enter DateofBirth"
            />
          </Form.Group>
          <Button onClick={this.handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
          <Button className="ml-3" onClick={() => {this.props.history.push('/engineer/profile')}} variant="primary" type="submit">
            Back
          </Button>
        </Form>
      </Card>
    );
  }
}

export default UpdateData;