import axios from 'axios'

const URL_STRING = "http://localhost:5000/engineer/profile"

export const getProfileSkill = () => {
  return {
    type: "GET_PROFILE_SKILL",
    payload: axios.get(URL_STRING, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`
      }
    }
    )}
  }
  

