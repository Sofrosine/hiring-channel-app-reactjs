import React, { Component } from "react";
import "./Card.css";
import axios from 'axios'
import { Redirect } from "react-router-dom";

class Card extends Component {
  state = {
    user: "",
    redirectProfile: false
  }

  getUserId = e => {
    e.stopPropagation()
    console.log('user', this.state.user);
    this.setState({
      ...this.state,
      user: e.target.getAttribute('name')
    });
    console.log(e.target.getAttribute('name'))
    console.log('user', this.state.user);
  };

  getProfile = e => {
    e.stopPropagation()
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    };
    axios
      // .get(`http://localhost:5000/engineer/user/${this.state.user}`, config)
      .get(`https://hiring-channel-application.herokuapp.com/engineer/user/${this.state.user}`, config)
      .then(result => {
        console.log(result);
        const data = result.data;
        this.setState({
          ...this.state,
          redirectProfile: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  redirectProfile = (user) => {
    if(this.state.redirectProfile) {
      return <Redirect to={"/user/" + this.state.user} />
    }
  }

  render() {
    return (
      <>
      {this.redirectProfile()}
        {this.props.engineerList.map(engineer => {
          return (
            
            <div
              key={engineer.id}
              name={engineer.id}
              className="mr-3 mb-3"
            >
              {console.log(engineer)}
              <div
                class="demo-card-image mdl-card mdl-shadow--2dp"

                name={engineer.id}
              >
                <div
                  onClick={this.getProfile}
                  onMouseOver={this.getUserId}
                  class="mdl-card__title mdl-card--expand"
                  name={engineer.id}
                ></div>
                <div class="mdl-card__actions" name={engineer.id}>
                  <div id="id-card-profile" class="demo-card-image__filename">
                    {engineer.Name}
                  </div>
                  <div id="desc" class="demo-card-image__filename">
                    {engineer.Description}
                  </div>
                  <div id="showcase-profile">
                    <span id="proj" class="demo-card-image__filename">
                      <i class="material-icons">check_circle</i>
                      {engineer.total_project} Projects
                    </span>
                    <span id="success-rate" class="demo-card-image__filename">
                      {" "}
                      <i class="material-icons">star</i>
                      {`${engineer.success_rate || 0}% Success Rate`}
                    </span>
                  </div>
                  <div id="skill-profile" class="demo-card-image__filename">
                    Skills
                  </div>
                  <div id="list-of-skill" class="demo-card-image__filename">
                    {engineer.Skill}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default Card;
