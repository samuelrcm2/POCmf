const INITIAL_STATE = {
  active: false,
  message: "Texto do alert",
  type: "success",
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GENERIC_ALERT_CHANGED":
      return {
        ...state,
        active: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case "GENERIC_ALERT_CLOSED":
      return {
        ...state,
        active: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
