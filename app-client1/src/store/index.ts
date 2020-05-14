import { createStore, Store, applyMiddleware } from "redux";
import { MotorChainState } from "./ducks/motorChain/types";
import rootReducer from "./ducks/rootReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export interface AplicationState {
  motorChain: MotorChainState;
}
const store: Store<AplicationState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
