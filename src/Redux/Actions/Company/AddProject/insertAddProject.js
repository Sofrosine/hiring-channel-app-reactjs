import axios from "axios";

const URL_STRING = "http://localhost:5000/company/insertProject";
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/company/insertProject";

export const insertAddProject = (data) => {
  return {
    type: "INSERT_ADD_PROJECT",
    payload: axios.post(URL_STRING, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  };
};
