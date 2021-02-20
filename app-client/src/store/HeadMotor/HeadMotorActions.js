import api from "../../Services/api";
import { FormatCalculosResponse } from "../../components/Generic/Util"
import { HeadMotorActionsType } from "./HeadMotorTypes";
import { changeGenericAlert } from "../Alert/alertActions";
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
        dispatch(setScrewMaxStress(FormatCalculosResponse(response.data)));
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
    type: HeadMotorActionsType.SCREW_PATTERN_GETTED,
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
    type: HeadMotorActionsType.SELECT_SCREW_PATTERN_SETTED,
    payload: selectedScrew,
  };
};

export const setExternalHeight = (value) => {
  return {
    type: HeadMotorActionsType.EXTERNAL_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setInternalHeight = (value) => {
  return {
    type: HeadMotorActionsType.INTERNAL_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setScrewHeight = (value) => {
  return {
    type: HeadMotorActionsType.SCREW_HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setThickness = (value) => {
  return {
    type: HeadMotorActionsType.THICKNESS_SETTED,
    payload: Number(value),
  };
};

const setScrewMaxStress = (value) => {
  return {
    type: HeadMotorActionsType.SCREW_MAX_STRESS,
    payload: value,
  };
};

export const setCreatedScrewPitch = (value) => {
  return {
    type: HeadMotorActionsType.CREATED_PITCH_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setInternalRadius = (value) => {
  return {
    type: HeadMotorActionsType.INTERNAL_RADIUS_SETTED,
    payload: Number(value),
  };
};

export const setInternalMinorRadius = (value) => {
  return {
    type: HeadMotorActionsType.INTERNAL_MINOR_RAIDUS_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMinMinorDiameter = (value) => {
  return {
    type: HeadMotorActionsType.CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMaxMinorDiameter = (value) => {
  return {
    type: HeadMotorActionsType.CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMinMajorDiameter = (value) => {
  return {
    type: HeadMotorActionsType.CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setCreatedScrewMaxMajorDiameter = (value) => {
  return {
    type: HeadMotorActionsType.CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED,
    payload: Number(value),
  };
};

export const setAfterScrewHeight = (value) => {
  return {
    type: HeadMotorActionsType.AFTER_SCREW_HEIGHT_SETTED,
    payload: Number(value),
  };
};
