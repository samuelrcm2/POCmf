import { MotorChain } from "./motorChainTypes";
import { MotorChainActionsType } from "./motorChainTypes";

const INITIAL_STATE = {
  motorChain: new MotorChain(),
  calculationType: "",
  calculatedData: {},
  allMaterials: [],
  buttonIsDisabled: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MotorChainActionsType.MATERIALS_GETTED:
      return { ...state, allMaterials: action.payload };
    case MotorChainActionsType.CALCULASTION_TYPE_SETTED:
      return {
        ...state,
        motorChain: INITIAL_STATE.motorChain,
        calculationType: action.payload,
      };
    case MotorChainActionsType.INTERNAL_RADIUS_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          internalRadius: action.payload,
        },
      };
    case MotorChainActionsType.HEIGHT_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          height: action.payload,
        },
      };
    case MotorChainActionsType.THICKNESS_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          thickness: action.payload,
        },
      };
    case MotorChainActionsType.VOLUME_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          volume: action.payload,
        },
      };
    case MotorChainActionsType.WORK_PRESSURE_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          workPressure: action.payload,
        },
      };
    case MotorChainActionsType.MATERIAL_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          materialId: action.payload,
        },
      };
    case MotorChainActionsType.LONGITUDINAL_STRESS_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          longitudinalStress: action.payload,
        },
      };
    case MotorChainActionsType.CIRCUNFERENTIAL_STRESS_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          circumferentialStress: action.payload,
        },
      };
    case MotorChainActionsType.MOTORCHAIN_PROPS_SETTED:
      return {
        ...state,
        calculatedData: action.payload,
      };
    case MotorChainActionsType.RADIAL_STRESS_SETTED:
      return {
        ...state,
        motorChain: {
          ...state.motorChain,
          radialStress: action.payload,
        },
      };
    case MotorChainActionsType.BUTTON_STATE_SETTED:
      return {
        ...state,
        buttonIsDisabled: !state.buttonIsDisabled,
      };
    default:
      return { ...state };
  }
};

export default reducer;
