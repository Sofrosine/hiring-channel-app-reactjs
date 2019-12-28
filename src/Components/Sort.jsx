import React, { Component } from "react";
import axios from "axios";

class Sort extends Component {
  state

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort by
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="http://fb.com" onClick={() => alert('hello world')}>
            Action
          </a>
          <a className="dropdown-item" href="http://google.com">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>
    );
  }
}

export default Sort;
