import axios from 'axios'

const URL_STRING = "http://localhost:5000/company/profile"

export const getCompany = config => {
  return {
    type:"GET_COMPANY",
    payload: axios.get(URL_STRING,config)
  }
}