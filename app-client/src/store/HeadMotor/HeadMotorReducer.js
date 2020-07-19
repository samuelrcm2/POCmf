import { HeadMotorActionsType, HeadMotor } from "./HeadMotorTypes";

const INITIAL_STATE = {
  headMotor: new HeadMotor(),
  calculationType: "",
  screwHeight: 0,
  internalHeadHeight: 0,
  externalHeadHeight: 0,
  calculatedData: null,
  screwPatterns: [],
  screwPatternsByDiameter: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeadMotorActionsType.SCREW_PATTERN_GETTED:
      return {
        ...state,
        screwPatterns: action.payload,
        screwPatternsByDiameter: action.payload,
      };
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
      return { ...state, calculatedData: action.payload };
    case HeadMotorActionsType.CREATED_PITCH_SCREW_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          screwPattern: {
            ...state.headMotor.screwPattern,
            pitch: action.payload,
            id: 0,
          },
        },
      };
    case HeadMotorActionsType.CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          screwPattern: {
            ...state.headMotor.screwPattern,
            minMinorDiameter: action.payload,
          },
        },
      };
    case HeadMotorActionsType.CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          screwPattern: {
            ...state.headMotor.screwPattern,
            maxMinorDiameter: action.payload,
          },
        },
      };
    case HeadMotorActionsType.CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          screwPattern: {
            ...state.headMotor.screwPattern,
            minMajorDiameter: action.payload,
          },
        },
      };
    case HeadMotorActionsType.CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          screwPattern: {
            ...state.headMotor.screwPattern,
            maxMajorDiameter: action.payload,
          },
        },
      };
    case HeadMotorActionsType.AFTER_SCREW_HEIGHT_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          afterScrewHeight: action.payload,
        },
      };
    case HeadMotorActionsType.INTERNAL_RADIUS_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          internalRadius: action.payload,
        },
      };
    case HeadMotorActionsType.INTERNAL_MINOR_RAIDUS_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          internalMinorRadius: action.payload,
        },
      };
    case HeadMotorActionsType.THICKNESS_SETTED:
      return {
        ...state,
        headMotor: {
          ...state.headMotor,
          thickness: action.payload,
        },
      };
    default:
      return { ...state };
  }
};

export default reducer;
