const initialState = {
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const updateStatusEngineer = (prevState = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATUS_ENGINEER_PENDING":
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "UPDATE_STATUS_ENGINEER_REJECTED":
      return {
        ...prevState,
        isPending: false,
        isRejected: true
      };
    case "UPDATE_STATUS_ENGINEER_FULFILLED":
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
      };
    default:
      return prevState;
  }
};

export default updateStatusEngineer