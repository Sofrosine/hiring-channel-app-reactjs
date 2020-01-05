import axios from "axios";

const URL_STRING = "http://localhost:5000/company/";

export const postCompany = (data,config) => {
  return {
    type: "POST_COMPANY",
    payload: axios.post(URL_STRING, data,config)
  };
};
