import api from "../../Services/api";
import { HeadMotorActionsType } from "./HeadMotorTypes";
import { changeGenericAlert } from "../Alert/alertActions";

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
      if (response) dispatch(addScrewPatternsByDiameter(response.data));
    });
  };
};

export const calculateScrewMaxStress = (headMotor) => {
  return (dispatch) => {
    api.get("/headMotor/", headMotor).then((response) => {
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
  console.log(HeadMotorActionsType);
  return {
    type: HeadMotorActionsType.SCREW_PATTERN_GETTED,
    payload: screwPatterns,
  };
};

export const addScrewPatternsByDiameter = (screwPatterns) => {
  return {
    type: HeadMotorActionsType.SCREW_PATTERN_BY_DIAMETER_GETTED,
    payload: screwPatterns,
  };
};

export const setSelectedScrew = (screwPattern) => {
  return {
    type: HeadMotorActionsType.SELECT_SCREW_PATTERN_SETTED,
    payload: screwPattern,
  };
};

export const setExternalHeight = (value) => {
  return {
    type: HeadMotorActionsType.EXTERNAL_HEIGHT_SETTED,
    payload: value,
  };
};

export const setInternalHeight = (value) => {
  return {
    type: HeadMotorActionsType.INTERNAL_HEIGHT_SETTED,
    payload: value,
  };
};

export const setScrewHeight = (value) => {
  return {
    type: HeadMotorActionsType.SCREW_HEIGHT_SETTED,
    payload: value,
  };
};

const setScrewMaxStress = (value) => {
  return {
    type: HeadMotorActionsType.SCREW_MAX_STRESS,
    payload: value,
  };
};
