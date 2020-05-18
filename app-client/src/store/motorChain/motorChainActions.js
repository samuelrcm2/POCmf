import api from "../../Services/api";
import { MotorChainActionsType } from "./motorChainTypes";

//Requests
export const getAllMaterials = () => {
  return (dispatch) => {
    api
      .get("/materials/getAllMaterials")
      .then((response) => {
        dispatch(addAllMaterials(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const calculateMotorChainProps = (motorChain, calculationType) => {
  return (dispatch) => {
    api
      .post("/motorChain/", { motorChain, calculationType })
      .then((response) => {
        dispatch(setMotorChainProps(response.data));
      })
      .catch((error) => console.log(error));
  };
};

//Actions
const addAllMaterials = (materials) => {
  return {
    type: MotorChainActionsType.MATERIALS_GETTED,
    payload: materials,
  };
};

const setMotorChainProps = (motorChainProps) => {
  return {
    type: MotorChainActionsType.MOTORCHAIN_PROPS_SETTED,
    payload: motorChainProps,
  };
};

export const setCalculationType = (value) => {
  return {
    type: MotorChainActionsType.CALCULASTION_TYPE_SETTED,
    payload: Number(value),
  };
};

export const setRadius = (value) => {
  return {
    type: MotorChainActionsType.RADIUS_SETTED,
    payload: Number(value),
  };
};

export const setHeight = (value) => {
  return {
    type: MotorChainActionsType.HEIGHT_SETTED,
    payload: Number(value),
  };
};

export const setThickness = (value) => {
  return {
    type: MotorChainActionsType.THICKNESS_SETTED,
    payload: Number(value),
  };
};

export const setVolume = (value) => {
  return {
    type: MotorChainActionsType.VOLUME_SETTED,
    payload: Number(value),
  };
};

export const setWorkPressure = (value) => {
  return {
    type: MotorChainActionsType.WORK_PRESSURE_SETTED,
    payload: Number(value),
  };
};

export const setMaterial = (value) => {
  return {
    type: MotorChainActionsType.MATERIAL_SETTED,
    payload: Number(value),
  };
};

export const setAdmissiveStress = (value) => {
  return {
    type: MotorChainActionsType.ADMISSIVE_STRESS_SETTED,
    payload: Number(value),
  };
};

export const setLongitudinalStress = (value) => {
  return {
    type: MotorChainActionsType.LONGITUDINAL_STRESS_SETTED,
    payload: Number(value),
  };
};

export const setCircunferentialStress = (value) => {
  return {
    type: MotorChainActionsType.CIRCUNFERENTIAL_STRESS_SETTED,
    payload: Number(value),
  };
};
