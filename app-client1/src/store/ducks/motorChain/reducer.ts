import { MotorChainState, RepositoriesTypes, MotorChain } from "./types";
import { Reducer } from "redux";

const INITIAL_STATE: MotorChainState = {
  motorChain: new MotorChain(),
  error: false,
  loading: false,
  allMaterials: [],
};

const reducer: Reducer<MotorChainState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RepositoriesTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case RepositoriesTypes.LOAD_SUCCES:
      return { ...state, loading: false, error: false, data: action.payload };
    case RepositoriesTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    case "MATERIALS_GETTED":
      return { ...state, allMaterials: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
