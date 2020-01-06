import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import "./EngineerList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowAltCircleDown,
  faStar
} from "@fortawesome/free-solid-svg-icons";

class EngineerList extends Component {
  state = {
    engineers: [],
    image: [
      "https://source.unsplash.com/random/800x720",
      "https://source.unsplash.com/random/900x720",
      "https://source.unsplash.com/random/600x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720"
    ]
  };

  getAllEngineer = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      .get("http://localhost:5000/engineer", config)
      // .get("https://hiring-channel-application.herokuapp.com/engineer", config)
      .then(result => {
        console.log(result.data.data);
        const data = result.data.data;
        this.setState({
          ...this.state,
          engineers: data
        });
        console.log(this.state.engineers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllEngineer();
  }

  render() {
    return (
      <div className="card-list">
        {this.state.engineers.map(engineer => {
          return (
            <>
              <div class="flip-card" onClick={() => this.props.history.push('/')}>
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    {/* <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;" /> */}
                    <div key={engineer.id}>
                      <div className="cards">
                        <div className="black-box"></div>
                        <div className="text-inside">
                          <p className="name">{engineer.Name}</p>
                          <p>{engineer.Description}</p>
                          <span className="mb-3">
                            <FontAwesomeIcon
                              style={{ color: "#34abeb" }}
                              icon={faArrowAltCircleDown}
                            />
                            <p className="ml-1">46 Projects</p>
                            <FontAwesomeIcon
                              className="ml-3"
                              style={{ color: "yellow" }}
                              icon={faStar}
                            />
                            <p className="ml-1">100% Success Rate</p>
                          </span>
                          <div className="skills">
                            <p>Skills:</p>
                            <p>{engineer.Skill}</p>
                          </div>
                        </div>
                        <img
                          src={
                            this.state.image[
                            Math.floor(Math.random() * this.state.image.length)
                            ]
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flip-card-back">
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                  </div>
                </div>
              </div>













              
            </>

            
          );
        })}
      </div>
    );
  }
}

export default EngineerList;
