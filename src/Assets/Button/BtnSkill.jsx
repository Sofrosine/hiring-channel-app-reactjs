import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class BtnSkill extends Component {
  render() {
    return (
      <div>
        <Button className="mb-3" style={{ width: "100%" }} onClick={this.props.onClick} variant="info">Edit Skill</Button>
      </div>
    )
  }
}

export default BtnSkill