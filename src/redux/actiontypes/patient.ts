import { Patient } from "../../services/openapi";
// Patient
export enum PatientActionTypes {
  ACTIVE_PATIENT = "ACTIVE_PATIENT",
  LOADED_PATIENTS = "LOADED_PATIENTS",
  LOADING_PATIENTS = "LOADING_PATIENTS",
  SET_PATIENTS = "SET_PATIENTS",
  NEW_PATIENT = "NEW_PATIENT",
}

export default interface PatientState {
  activePatient: Patient | null;
  loading: boolean;
  patients: Array<Patient> | null;
}

export interface patientStateActivePatient {
  type: PatientActionTypes.ACTIVE_PATIENT;
  payload: Patient | null;
}

export interface patientStateLoading {
  type: PatientActionTypes.LOADING_PATIENTS;
}

export interface patientStateLoaded {
  type: PatientActionTypes.LOADED_PATIENTS;
}

export interface patientStateSet {
  type: PatientActionTypes.SET_PATIENTS;
  payload: Array<Patient> | null;
}

export interface patientStateNew {
  type: PatientActionTypes.NEW_PATIENT;
}

export type PatientStateActions =
  | patientStateActivePatient
  | patientStateLoading
  | patientStateLoaded
  | patientStateSet
  | patientStateNew;
