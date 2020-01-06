import axios from "axios";

// const URL_STRING = "http://localhost:5000/company/";

export const deleteEngineerHome = (id_project, id_engineer) => {
  return {
    type: "DELETE_ENGINEER_HOME",
    payload: axios.delete(
      `http://localhost:5000/engineer/status/${id_project}/${id_engineer}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`
        }
      }
    )
    // payload: axios.delete(
    //   `https://hiring-channel-application.herokuapp.com/engineer/status/${id_project}/${id_engineer}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${JSON.parse(
    //         localStorage.getItem("accessToken")
    //       )}`
    //     }
    //   }
    // )
  };
};
