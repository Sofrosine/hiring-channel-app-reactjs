import axios from "axios";

// const URL_STRING = "http://localhost:5000/engineer";
const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer";

export const insertEngineer = (data) => {
  return {
    type: "INSERT_ENGINEER",
    payload: axios.post(URL_STRING, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  };
};
