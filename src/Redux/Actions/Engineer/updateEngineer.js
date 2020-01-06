import axios from 'axios'

// const URL_STRING = "http://localhost:5000/engineer/"
const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/"

export const updateEngineer = (params) => {
  return {
    type: "UPDATE_ENGINEER",
    payload: axios({
      method: "patch",
      url: URL_STRING,
      params: params,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}
