import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class BtnUpdate extends Component {
  render() {
    return (
      <div>
        <Button className="mb-3 text-white" style={{width:"100%"}} onClick={this.props.onClick} variant="warning">Update</Button>
      </div>
    )
  }
}

export default BtnUpdate