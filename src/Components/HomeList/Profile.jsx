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
    <div className="card-list-profile ml-4">
      <div>
        <div className="cards">
          <div className="black-box"></div>
          <div className="text-inside">
            <p className="name">{props.profile[1]} ({props.profile[0]})</p>
            <p>{props.profile[2]}</p>
            <span className="mb-3">
              <FontAwesomeIcon
                style={{ color: "#34abeb" }}
                icon={faArrowAltCircleDown}
              />
              <p className="ml-1">{props.profile[11]} Projects</p>
              <FontAwesomeIcon
                className="ml-3"
                style={{ color: "yellow" }}
                icon={faStar}
              />
              <p className="ml-1">{`${props.profile[10] || 0}% Success Rate` || '0% Success Rate'}</p>
            </span>
            <div className="skills">
              <p>Skills:</p>
              <p className="skills-detail overflow-test">{props.profile[8]}</p>
            </div>
          </div>
          <img src="https://source.unsplash.com/random/500x720" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
