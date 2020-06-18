import api from "../../Services/api";
import { HeadMotorActionsType } from "./HeadMotorTypes";
import { changeGenericAlert } from "../Alert/alertActions";

export const getAllScrewPatterns = () => {
  return (dispatch) => {
    api.get("/screPatterns/").then((response) => {
      if (response) dispatch(addAllScrewPatterns(response.data));
    });
  };
};

export const calculateScrewMaxStress = (headMotor) => {
  return (dispatch) => {
    api.get("/headMotor/", headMotor).then((response) => {
      if (response) dispatch(setScrewMaxStress(response.data));
    });
  };
};

//Actions
export const addAllScrewPatterns = (screwPatterns) => {
  return {
    type: HeadMotorActionsType.MATERIALS_GETTED,
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
