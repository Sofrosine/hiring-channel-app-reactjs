import axios from 'axios'

const URL_STRING = "http://localhost:5000/company/profile"
// const URL_STRING = "https://hiring-channel-application.herokuapp.com/company/profile"

export const getCompany = config => {
  return {
    type:"GET_COMPANY",
    payload: axios.get(URL_STRING,config)
  }
}