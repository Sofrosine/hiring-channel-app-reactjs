import axios from 'axios'

export const getLoginEngineer = (email, password) => {
  return {
    type: "GET_LOGIN_ENGINEER",
    payload: axios({
      method: "get",
      url: "http://localhost:5000/engineer/login",
      params: {
        email: email,
        password: password
      }
    })
  }
}


