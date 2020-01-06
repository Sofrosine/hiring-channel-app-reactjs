import axios from 'axios'

// const URL_STRING = "http://localhost:5000/engineer/"

export const updateEngineerHome = (id_project,body) => {
  return {
    type: "UPDATE_ENGINEER_HOME",
    // payload: axios.patch(`http://localhost:5000/company/project/${id_project}`,body,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${JSON.parse(
    //         localStorage.getItem("accessToken")
    //       )}`
    //     }
    //   })
    payload: axios.patch(`https://hiring-channel-application.herokuapp.com/company/project/${id_project}`, body,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      })
  }
}
