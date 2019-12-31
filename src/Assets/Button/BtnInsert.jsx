import React, {Component} from 'react'
import { Button } from 'react-bootstrap'


class BtnInsert extends Component {
  render() {
    return (
      <div>
        <a class="mb-3 waves-effect waves-light btn red white-text orange lighten-2" style={{ width: "100%" }} onClick={this.props.onClick}>Insert</a>
      </div>
    )
  }
} 

export default BtnInsert