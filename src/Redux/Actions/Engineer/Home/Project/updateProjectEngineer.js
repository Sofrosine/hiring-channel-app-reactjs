import axios from 'axios'

export const updateProjectEngineer = (id, state_is_accept) => {
  return {
    type: "UPDATE_PROJECT_ENGINEER",
    payload: axios({
      method: "patch",
      // url: `http://localhost:5000/engineer/status/${id}`,
      url: `https://hiring-channel-application.herokuapp.com/engineer/status/${id}`,
      params: {
        is_accept: state_is_accept
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}