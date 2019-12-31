import React, { Component } from "react";
import M from "materialize-css";
import Navbar from "./Navbar";

class Tezt extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <>
        <Navbar/>
        <div className="row">
          <div className="container">
            <div className="col">
              
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tezt;
