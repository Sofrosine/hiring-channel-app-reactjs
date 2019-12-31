import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


class BtnUpdate extends Component {
  render() {
    return (
      <div>
        <a class="mb-3 waves-effect waves-light btn red orange-text orange lighten-4" style={{ width: "100%" }} onClick={this.props.onClick}>Update</a>
      </div>
    )
  }
}

export default BtnUpdate