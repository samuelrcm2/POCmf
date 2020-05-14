import { MotorChain } from "./motorChainTypes";

const INITIAL_STATE = {
  motorChain: new MotorChain(),
  calculationType: "",
  loading: false,
  allMaterials: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MATERIALS_GETTED":
      return { ...state, allMaterials: action.payload };
    case "CALCULASTION_TYPE_SETTED":
      return {
        ...state,
        calculationType: action.payload,
      };
    case "RADIUS_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          radius: action.payload,
        },
      };
    case "HEIGHT_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          height: action.payload,
        },
      };
    case "THICKNESS_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          thickness: action.payload,
        },
      };
    case "VOLUME_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          volume: action.payload,
        },
      };
    case "WORK_PRESSURE_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          work_pressure: action.payload,
        },
      };
    case "MATERIAL_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          material_id: action.payload,
        },
      };
    case "ADMISSIVE_STRESS_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          admissive_stress: action.payload,
        },
      };
    case "LONGITUDINAL_STRESS_SETTED":
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          longitudinal_stress: action.payload,
        },
      };
    default:
      return { ...state };
  }
};

export default reducer;
