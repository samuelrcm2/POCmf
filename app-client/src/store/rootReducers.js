import { combineReducers } from "redux";

import motorChain from "./motorChain/motorChainReducer";
import alert from "./Alert/alertReducer";
import headMotor from "./HeadMotor/HeadMotorReducer";

export default combineReducers({
  motorChain,
  alert,
  headMotor,
});
