import axios from "axios";

const URL_STRING = "http://localhost:5000/engineer/filter";

export const searchUser = params => {
  return {
    type: "SEARCH_USER",
    payload: axios({
      method: "get",
      url: URL_STRING,
      params: params
    })
  };
};
