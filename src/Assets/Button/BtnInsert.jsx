import React, {Component} from 'react'
import { Button } from 'react-bootstrap'


class BtnInsert extends Component {
  render() {
    return (
      <div>
        <Button className="mb-3" style={{ width: "100%" }} onClick={this.props.onClick} variant="primary">Insert</Button>
      </div>
    )
  }
} 

export default BtnInsert