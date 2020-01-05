import axios from 'axios'

export const updateListProject = (data,id_project) => {
  return {
    type: "UPDATE_LIST_PROJECT",
    payload: axios
      .patch(
        `http://localhost:5000/company/project/${id_project}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`
          }
        }
      )
  }
}
