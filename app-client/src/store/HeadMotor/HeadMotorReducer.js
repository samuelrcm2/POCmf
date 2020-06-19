import { HeadMotorActionsType, HeadMotor } from "./HeadMotorTypes";

const INITIAL_STATE = {
  headMotor: new HeadMotor(),
  calculationType: "",
  screwHeight: 0,
  internalHeadHeight: 0,
  externalHeadHeight: 0,
  maxScrewStress: null,
  screwPatterns: [],
  screwPatternsByDiameter: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeadMotorActionsType.SCREW_PATTERN_GETTED:
      return { ...state, screwPatterns: action.payload };
    case HeadMotorActionsType.SCREW_PATTERN_BY_DIAMETER_GETTED:
      return { ...state, screwPatternsByDiameter: action.payload };
    case HeadMotorActionsType.SELECT_SCREW_PATTERN_SETTED:
      return {
        ...state,
        headMotor: { ...state.headMotor, screwPattern: action.payload },
      };
    case HeadMotorActionsType.EXTERNAL_HEIGHT_SETTED:
      return {
        ...state,
        headMotor: { ...state.headMotor, externalHeadHeight: action.payload },
      };
    case HeadMotorActionsType.INTERNAL_HEIGHT_SETTED:
      return {
        ...state,
        headMotor: { ...state.headMotor, internalHeadHeight: action.payload },
      };
    case HeadMotorActionsType.SCREW_HEIGHT_SETTED:
      return {
        ...state,
        headMotor: { ...state.headMotor, screwHeight: action.payload },
      };
    case HeadMotorActionsType.SCREW_MAX_STRESS:
      return { ...state, maxScrewStress: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
