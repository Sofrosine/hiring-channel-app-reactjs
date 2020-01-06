import axios from 'axios'

const URL_STRING = "http://localhost:5000/engineer/status"
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/status"

export const getStatusEngineer = () => {
  return {
    type: "GET_STATUS_ENGINEER",
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


