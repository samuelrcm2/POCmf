export const changeGenericAlert = (message, type) => {
  return {
    type: "GENERIC_ALERT_CHANGED",
    payload: { message, type },
  };
};

export const closeGenericAlert = () => {
  return {
    type: "GENERIC_ALERT_CLOSED",
  };
};
