import axios from 'axios'

export const updateAddProject = (data) => {
  return {
    type: "UPDATE_ADD_PROJECT",
    payload: axios({
      method: "patch",
      // url: "http://localhost:5000/company/updateProject",
      url: "https://hiring-channel-application.herokuapp.com/company/updateProject",
      params: data,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}
