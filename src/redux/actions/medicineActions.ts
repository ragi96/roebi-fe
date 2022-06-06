import { OpenAPI, Medicine, MedicineService } from "../../services/openapi";
import { MedicineActionTypes } from "../actiontypes/medicine";

const { getMedicine, getMedicine1, postMedicine, putMedicine } =
  MedicineService;

OpenAPI.BASE = process.env.REACT_APP_API_URI ?? "";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allMedicines = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicineActionTypes.LOADING_MEDICINES,
    });
    try {
      const response = await getMedicine();
      dispatch({
        type: MedicineActionTypes.SET_MEDICINES,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMedicineById = (id: number) => {
  return async (dispatch: any) => {
    try {
      const medicine = await getMedicine1(id);
      if (medicine.id == null) {
        dispatch({
          type: MedicineActionTypes.LOADED_MEDICINES,
        });
      } else {
        dispatch({
          type: MedicineActionTypes.ACTIVE_MEDICINE,
          payload: medicine,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const newMedicine = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicineActionTypes.NEW_MEDICINE,
    });
  };
};

export const loadMedicines = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicineActionTypes.LOADED_MEDICINES,
    });
  };
};

export const createMedicine = (medicine: Medicine) => {
  return async (dispatch: any) => {
    try {
      await postMedicine(medicine);
      dispatch({
        type: MedicineActionTypes.LOADED_MEDICINES,
      });
      dispatch(allMedicines());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateMedicine = (medicine: Medicine) => {
  return async (dispatch: any) => {
    try {
      await putMedicine(medicine);
      dispatch({
        type: MedicineActionTypes.LOADED_MEDICINES,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
