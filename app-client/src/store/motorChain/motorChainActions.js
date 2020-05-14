import api from "../../components/services/api";

const addAllMaterials = (materials) => {
  return {
    type: "MATERIALS_GETTED",
    payload: materials,
  };
};

export const getAllMaterials = () => {
  return (dispatch) => {
    api
      .get("/materials/getAllMaterials")
      .then((response) => {
        dispatch(addAllMaterials(response.data));
        // console.log(response);
        // action(RepositoriesTypes.MATERIALS_GETTED, response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const setCalculationType = (value) => {
  return {
    type: "CALCULASTION_TYPE_SETTED",
    payload: value,
  };
};

export const setRadius = (value) => {
  return {
    type: "RADIUS_SETTED",
    payload: value,
  };
};

export const setHeight = (value) => {
  return {
    type: "HEIGHT_SETTED",
    payload: value,
  };
};

export const setThickness = (value) => {
  return {
    type: "THICKNESS_SETTED",
    payload: value,
  };
};

export const setVolume = (value) => {
  return {
    type: "VOLUME_SETTED",
    payload: value,
  };
};

export const setWorkPressure = (value) => {
  return {
    type: "WORK_PRESSURE_SETTED",
    payload: value,
  };
};

export const setMaterial = (value) => {
  return {
    type: "MATERIAL_SETTED",
    payload: value,
  };
};

export const setAdmissiveStress = (value) => {
  return {
    type: "ADMISSIVE_STRESS_SETTED",
    payload: value,
  };
};

export const setLongitudinalStress = (value) => {
  return {
    type: "LONGITUDINAL_STRESS_SETTED",
    payload: value,
  };
};
