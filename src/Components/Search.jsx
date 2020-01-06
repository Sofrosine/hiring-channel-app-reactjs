import React, {Component} from 'react'
import './Navbar'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './HomeList/EngineerList.css'
import {
  faHome,
  faArrowAltCircleDown,
  faStar
} from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  state = {
    name: '',
    skill: '',
    data: [],
    image: [
      "https://source.unsplash.com/random/800x720",
      "https://source.unsplash.com/random/900x720",
      "https://source.unsplash.com/random/600x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720",
      "https://source.unsplash.com/random/500x720"
    ]
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log('name',this.state.name)
    console.log('skill', this.state.skill)
  }

  handleSearch = (e) => {
    axios({
      method: "get",
      url: "http://localhost:5000/engineer/filter",
      // url: "https://hiring-channel-application.herokuapp.com/engineer/filter",
      params: {
        name: this.state.name,
        skill: this.state.skill
      }
    })
    .then(result => {
      console.log(result)
      console.log(result.data)
      console.log(result.data.data)
      const searchResult = result.data.data
      this.setState({
        ...this.state,
        name: '',
        skill: '',
        data: searchResult
      })
      console.log(this.state.data)
    })
    .catch(err => { 
      console.log(err)
    })
  }

  render() {
    return(
      <div>
        <div>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          <input type="text" name="skill" onChange={this.handleChange} value={this.state.skill}/>
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          {
            <div className="card-list">
              {this.state.data.map(engineer => {
                return (
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
                );
              })}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Search