import axios from 'axios'

// const URL_STRING = "http://localhost:5000/engineer/profile"
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/profile"

export const getProfileEngineer = (user) => {
  return {
    type: "GET_PROFILE_ENGINEER",
    payload: axios.get(`http://localhost:5000/engineer/user/${user}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    }
    )
  }
}


