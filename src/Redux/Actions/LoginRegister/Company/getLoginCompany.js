import axios from 'axios'

export const getLoginCompany = (email, password) => {
  return {
    type: "GET_LOGIN_COMPANY",
    payload: axios({
      method: "get",
      url: "http://localhost:5000/company/login",
      params: {
        email: email,
        password: password
      }
    })
  }
}


