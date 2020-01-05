import axios from 'axios'

const URL_STRING = "http://localhost:5000/company/"

export const updateCompany = (params) => {
  return {
    type: "UPDATE_COMPANY",
    payload: axios({
      method: "patch",
      url: URL_STRING,
      params: params,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    })
  }
}
