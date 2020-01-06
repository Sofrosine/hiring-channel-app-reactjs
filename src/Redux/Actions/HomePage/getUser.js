import Axios from "axios";

const URL_STRING = "http://localhost:5000/engineer/filter";
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/filter";

export const getUser = () => {
  return {
    type: "GET_USER",
    payload: Axios.get(URL_STRING)
  };
};
