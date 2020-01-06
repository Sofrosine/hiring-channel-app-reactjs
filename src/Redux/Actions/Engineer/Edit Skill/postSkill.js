import axios from "axios";

const URL_STRING = "http://localhost:5000/engineer/skill";
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/engineer/skill";

export const postSkill = (data) => {
  return {
    type: "POST_SKILL",
    payload: axios.post(URL_STRING, data)
  };
};
