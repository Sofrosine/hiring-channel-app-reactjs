import axios from 'axios'

// const URL_STRING = "http://localhost:5000/engineer/project"
const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/project"

export const getProjectEngineer = () => {
  return {
    type: "GET_PROJECT_ENGINEER",
    payload: axios.get(URL_STRING, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    }
    )
  }
}


