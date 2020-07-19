import api from "../../Services/api";
import { MotorNozzleActionsType } from "./MotorNozzleTypes";
import { changeGenericAlert } from "../Alert/alertActions";
import { HeadMotorActionsType } from "../HeadMotor/HeadMotorTypes";
import store from "../store";

export const getAllScrewPatterns = () => {
  return (dispatch) => {
    api.get("/screwPatterns/").then((response) => {
      if (response) dispatch(addAllScrewPatterns(response.data));
    });
  };
};

export const getScrewPatternsByDiameter = (diameters) => {
  return (dispatch) => {
    api.get("/screwPatterns/getByDiamter/", diameters).then((response) => {
      if (response) dispatch(setPossibleScrewPatterns(response.data));
    });
  };
};

export const calculateScrewMaxStress = (headMotor) => {
  return (dispatch) => {
    api.post("/headMotor/maxScrewStress/", headMotor).then((response) => {
      if (response) {
        dispatch(setScrewMaxStress(response.data));
        dispatch(
          changeGenericAlert("Properties calculated successfully", "success")
        );
      }
    });
  };
};

//Actions
export const addAllScrewPatterns = (screwPatterns) => {
  return {
    type: MotorNozzleActionsType.SCREW_PATTERN_GETTED,
    payload: screwPatterns,
  };
};

export const setPossibleScrewPatterns = (screwPatterns) => {
  return {
    type: HeadMotorActionsType.SCREW_PATTERN_BY_DIAMETER_GETTED,
    payload: screwPatterns,
  };
};

export const setSelectedScrew = (screwPatternId) => {
  const selectedScrew = store
    .getState()
    .headMotor.screwPatterns.find((s) => s.id === screwPatternId);
  return {
    type: MotorNozzleActionsType.SELECT_SCREW_PATTERN_SETTED,
    payload: selectedScrew,
  };
};

export const setExternalHeight = (value) => {
  return {
    type: MotorNozzleActionsType.EXTERNAL_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setInternalHeight = (value) => {
  return {
    type: MotorNozzleActionsType.INTERNAL_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setScrewHeight = (value) => {
  return {
    type: MotorNozzleActionsType.SCREW_HEIGHT_SETTED,
    payload: Number(value),
  };
};

const setScrewMaxStress = (value) => {
  return {
    type: MotorNozzleActionsType.SCREW_MAX_STRESS,
    payload: Number(value),
  };
};

export const setCreatedScrewPitch = (value) => {
  return {
    type: MotorNozzleActionsType.CREATED_PITCH_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setThickness = (value) => {
  return {
    type: MotorNozzleActionsType.THICKNESS_SETTED,
    payload: Number(value),
  };
};

export const setAfterScrewHeight = (value) => {
  return {
    type: MotorNozzleActionsType.AFTER_SCREW_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setInternalMajorRadius = (value) => {
  return {
    type: MotorNozzleActionsType.INTERNAL_MAJOR_RADIUS_SETTED,
    payload: Number(value),
  };
};

export const setInternalMinorRadius = (value) => {
  return {
    type: MotorNozzleActionsType.INTERNAL_MINOR_RADIUS_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMinMinorDiameter = (value) => {
  return {
    type: MotorNozzleActionsType.CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMaxMinorDiameter = (value) => {
  return {
    type: MotorNozzleActionsType.CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMinMajorDiameter = (value) => {
  return {
    type: MotorNozzleActionsType.CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMaxMajorDiameter = (value) => {
  return {
    type: MotorNozzleActionsType.CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};
