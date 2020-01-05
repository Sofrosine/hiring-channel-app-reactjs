import axios from "axios";

export const cancelListProject = (id_project,id_engineer) => {
  return {
    type: "CANCEL_LIST_PROJECT",
    payload: axios
      .delete(
        `http://localhost:5000/engineer/status/${id_project}/${id_engineer}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`
          }
        }
      )
  };
};
