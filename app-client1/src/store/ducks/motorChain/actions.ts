import { action } from "typesafe-actions";
import { RepositoriesTypes, Material } from "./types";
import { Dispatch } from "redux";

import api from "../../../components/services/api";
export const loadRequest = () => action(RepositoriesTypes.LOAD_REQUEST);

// export const loadSucces = (data: Repository[]) => action(RepositoriesTypes.LOAD_SUCCES, data)
const addAllMaterials = (materials: Material[]) => {
  return {
    type: "MATERIALS_GETTED",
    payload: materials,
  };
};

export const getAllMaterials = () => {
  return (dispatch: Dispatch) => {
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

export const loadFailure = () => action(RepositoriesTypes.LOAD_FAILURE);
