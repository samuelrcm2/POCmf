import { combineReducers } from "redux";

import motorChain from "./motorChain/motorChainReducer";

export default combineReducers({
  motorChain,
});

// import { createStore, Store, applyMiddleware, compose } from "redux";
// import { MotorChainState } from "./ducks/motorChain/types";
// import rootReducer from "./ducks/rootReducers";
// import thunk from "redux-thunk";
// export interface AplicationState {
//   motorChain: MotorChainState;
// }
// const composeEnhancers =
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ || compose;

// const store: Store<AplicationState> = createStore(
//   rootReducer
//   // composeEnhancers(applyMiddleware(thunk))
// );

// export default store;
