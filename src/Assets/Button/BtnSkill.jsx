import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class BtnSkill extends Component {
  render() {
    return (
      <div>
        <a class="mb-3 waves-effect waves-light btn red white-text red accent-2" style={{ width: "100%" }} onClick={this.props.onClick}>Edit Skill</a>
      </div>
    )
  }
}

export default BtnSkill