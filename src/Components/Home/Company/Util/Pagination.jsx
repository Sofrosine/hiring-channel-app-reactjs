import React, {Component} from 'react'

class Pagination extends Component {
  render() {
    return(
      <>
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link red-text text-lighten-2 white"
              href="#"
              onClick={this.props.prevPage}
            >
              &laquo;
                  </a>
          </li>
          <li className="page-item">
            <a
              className="page-link red-text text-lighten-2 white"
              href="#"
            >
              {this.props.page} from {this.props.pages}
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link red-text text-lighten-2 white"
              href="#"
            >
              {this.props.totalData}
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link red-text text-lighten-2 white"
              href="#"
              onClick={this.props.nextPage}
            >
              &raquo;
                  </a>
          </li>
        </ul>
      </>
    )
  }
}

export default Pagination