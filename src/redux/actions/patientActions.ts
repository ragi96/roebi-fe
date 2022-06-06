import {
  OpenAPI,
  AddPatientDto,
  UpdatePatientDto,
  PatientService,
} from "../../services/openapi";
import { PatientActionTypes } from "../actiontypes/patient";

const { getPatient, getPatient1, postPatient, putPatient } = PatientService;

OpenAPI.BASE = process.env.REACT_APP_API_URI ?? "";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allPatients = () => {
  return async (dispatch: any) => {
    dispatch({
      type: PatientActionTypes.LOADING_PATIENTS,
    });
    try {
      const response = await getPatient();
      dispatch({
        type: PatientActionTypes.SET_PATIENTS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPatientById = (id: number) => {
  return async (dispatch: any) => {
    try {
      const patient = await getPatient1(id);
      if (patient.id == null) {
        dispatch({
          type: PatientActionTypes.LOADED_PATIENTS,
        });
      } else {
        dispatch({
          type: PatientActionTypes.ACTIVE_PATIENT,
          payload: patient,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const newPatient = () => {
  return async (dispatch: any) => {
    dispatch({
      type: PatientActionTypes.NEW_PATIENT,
    });
  };
};

export const loadPatients = () => {
  return async (dispatch: any) => {
    dispatch({
      type: PatientActionTypes.LOADED_PATIENTS,
    });
  };
};

export const createPatient = (patient: AddPatientDto) => {
  return async (dispatch: any) => {
    try {
      await postPatient(patient);
      dispatch({
        type: PatientActionTypes.LOADED_PATIENTS,
      });
      dispatch(allPatients());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePatient = (patient: UpdatePatientDto) => {
  return async (dispatch: any) => {
    try {
      await putPatient(patient);
      dispatch({
        type: PatientActionTypes.LOADED_PATIENTS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
