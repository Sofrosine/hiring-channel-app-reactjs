import axios from "axios";

const URL_STRING = "http://localhost:5000/company/addProject";

export const postListProject = (data) => {
  return {
    type: "POST_LIST_PROJECT",
    payload: axios.post(URL_STRING, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  };
};
