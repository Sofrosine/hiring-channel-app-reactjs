import axios from 'axios'

export const updateIsStatusEngineer2 = (id_project) => {
  return {
    type: "UPDATE_IS_STATUS_ENGINEER_2",
    payload: axios({
      method: "patch",
      // url: `http://localhost:5000/company/project2/${id_project}`,
      url: `https://hiring-channel-application.herokuapp.com/company/project2/${id_project}`,
      params: {
        status: "On Process"
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}