import axios from 'axios'

export const updateIsStatusEngineer0 = (id_project) => {
  return {
    type: "UPDATE_IS_STATUS_ENGINEER_0",
    payload: axios({
      method: "patch",
      url: `http://localhost:5000/company/project2/${id_project}`,
      params: {
        status: "Pending"
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}