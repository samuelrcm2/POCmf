import { MotorNozzleActionsType, MotorNozzle } from "./MotorNozzleTypes";

const INITIAL_STATE = {
  motorNozzle: new MotorNozzle(),
  calculationType: "",
  screwHeight: 0,
  calculatedData: null,
  screwPatterns: [],
  screwPatternsByDiameter: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MotorNozzleActionsType.SCREW_PATTERN_GETTED:
      return {
        ...state,
        screwPatterns: action.payload,
        screwPatternsByDiameter: action.payload,
      };
    case MotorNozzleActionsType.SCREW_PATTERN_BY_DIAMETER_GETTED:
      return { ...state, screwPatternsByDiameter: action.payload };
    case MotorNozzleActionsType.SELECT_SCREW_PATTERN_SETTED:
      return {
        ...state,
        motorNozzle: { ...state.motorNozzle, screwPattern: action.payload },
      };
    case MotorNozzleActionsType.EXTERNAL_HEIGHT_SETTED:
      return {
        ...state,
        motorNozzle: { ...state.motorNozzle, externalHeight: action.payload },
      };
    case MotorNozzleActionsType.INTERNAL_HEIGHT_SETTED:
      return {
        ...state,
        motorNozzle: { ...state.motorNozzle, internalHeight: action.payload },
      };
    case MotorNozzleActionsType.SCREW_HEIGHT_SETTED:
      return {
        ...state,
        motorNozzle: { ...state.motorNozzle, screwHeight: action.payload },
      };
    case MotorNozzleActionsType.SCREW_MAX_STRESS:
      return { ...state, calculatedData: action.payload };
    case MotorNozzleActionsType.CREATED_PITCH_SCREW_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          screwPattern: {
            ...state.motorNozzle.screwPattern,
            pitch: action.payload,
            id: 0,
          },
        },
      };
    case MotorNozzleActionsType.CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          screwPattern: {
            ...state.motorNozzle.screwPattern,
            minMinorDiameter: action.payload,
          },
        },
      };
    case MotorNozzleActionsType.CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          screwPattern: {
            ...state.motorNozzle.screwPattern,
            maxMinorDiameter: action.payload,
          },
        },
      };
    case MotorNozzleActionsType.CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          screwPattern: {
            ...state.motorNozzle.screwPattern,
            minMajorDiameter: action.payload,
          },
        },
      };
    case MotorNozzleActionsType.CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          screwPattern: {
            ...state.motorNozzle.screwPattern,
            maxMajorDiameter: action.payload,
          },
        },
      };
    case MotorNozzleActionsType.INTERNAL_MAJOR_RADIUS_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          internalMajorRadius: action.payload,
        },
      };
    case MotorNozzleActionsType.INTERNAL_MINOR_RADIUS_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          internalMinorRadius: action.payload,
        },
      };
    case MotorNozzleActionsType.THICKNESS_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          thickness: action.payload,
        },
      };
    case MotorNozzleActionsType.AFTER_SCREW_HEIGHT_SETTED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          afterScrewHeight: action.payload,
        },
      };
    case MotorNozzleActionsType.HM_SCREW_PATTERN_COPIED:
      return {
        ...state,
        motorNozzle: {
          ...state.motorNozzle,
          afterScrewHeight: action.payload.headMotor.afterScrewHeight,
          thickness: action.payload.headMotor.thickness,
          internalMinorRadius: action.payload.headMotor.internalMinorRadius,
          internalMajorRadius: action.payload.headMotor.internalRadius,
          maxMajorDiameter: action.payload.headMotor.maxMajorDiameter,
          minMajorDiameter: action.payload.headMotor.minMajorDiameter,
          maxMinorDiameter: action.payload.headMotor.maxMinorDiameter,
          screwPattern: action.payload.headMotor.screwPattern,
          externalHeight: action.payload.headMotor.externalHeadHeight,
          internalHeight: action.payload.headMotor.internalHeadHeight,
          screwHeight: action.payload.headMotor.screwHeight
        }
      } 
    default:
      return { ...state };
  }
};

export default reducer;
