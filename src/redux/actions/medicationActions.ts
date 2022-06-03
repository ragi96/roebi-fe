import {
  OpenAPI,
  MedicationService,
  UpdateMedicationDto,
  AddMedicationDto,
} from "../../services/openapi";
import { MedicationActionTypes } from "../actiontypes/medication";

const {
  getMedicationUser,
  getMedication,
  getMedication1,
  postMedication,
  putMedication,
} = MedicationService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const getMedicationByUser = (id: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicationActionTypes.LOADING_MEDICATIONS,
    });
    try {
      const response = await getMedicationUser(id);
      dispatch({
        type: MedicationActionTypes.SET_MEDICATIONS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const allMedications = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicationActionTypes.LOADING_MEDICATIONS,
    });
    try {
      const response = await getMedication();
      dispatch({
        type: MedicationActionTypes.SET_MEDICATIONS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMedicationById = (id: number) => {
  return async (dispatch: any) => {
    try {
      const medication = await getMedication1(id);
      if (medication.id == null) {
        dispatch({
          type: MedicationActionTypes.LOADED_MEDICATIONS,
        });
      } else {
        dispatch({
          type: MedicationActionTypes.ACTIVE_MEDICATION,
          payload: medication,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const newMedication = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicationActionTypes.NEW_MEDICATION,
    });
  };
};

export const loadMedications = () => {
  return async (dispatch: any) => {
    dispatch({
      type: MedicationActionTypes.LOADED_MEDICATIONS,
    });
  };
};

export const createMedication = (medication: AddMedicationDto) => {
  return async (dispatch: any) => {
    try {
      await postMedication(medication);
      dispatch({
        type: MedicationActionTypes.LOADED_MEDICATIONS,
      });
      if (medication.patient != null)
        dispatch(getMedicationUser(medication.patient));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateMedication = (medication: UpdateMedicationDto) => {
  return async (dispatch: any) => {
    try {
      await putMedication(medication);
      dispatch({
        type: MedicationActionTypes.LOADED_MEDICATIONS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
