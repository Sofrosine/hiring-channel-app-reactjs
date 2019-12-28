import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class BtnUpdate extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onClick} style={{ width: "100%" }} variant="danger">Delete</Button>
      </div>
    )
  }
}

export default BtnUpdate