import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowAltCircleDown,
  faStar
} from "@fortawesome/free-solid-svg-icons";





const Profile = props => {
  return (
    <div className="card-list">
      <div
        key={props.profile[0]}
        name={props.profile[0]}
        // className="mr-3 mb-3"
      >
        <div
          class="demo-card-image mdl-card mdl-shadow--2dp"
          name={props.profile[0]}
        >
          <div
            class="mdl-card__title mdl-card--expand"
            name={props.profile[0]}
          ></div>
          <div class="mdl-card__actions" name={props.profile[0]}>
            <div id="id-card-profile" class="demo-card-image__filename">
              {props.profile[1]}
            </div>
            <div id="desc" class="demo-card-image__filename">
              {props.profile[2]}
            </div>
            <div id="showcase-profile">
              <span id="proj" class="demo-card-image__filename">
                <i class="material-icons">check_circle</i>
                {props.profile[11]} Projects
                    </span>
              <span id="success-rate" class="demo-card-image__filename">
                {" "}
                <i class="material-icons">star</i>
                {`${Math.ceil(props.profile[10]) || 0}% Success Rate`}
              </span>
            </div>
            <div id="skill-profile" class="demo-card-image__filename">
              Skills
                  </div>
            <div id="list-of-skill" class="demo-card-image__filename">
              {props.profile[8]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
