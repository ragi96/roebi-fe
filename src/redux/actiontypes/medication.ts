import { Medication } from "../../services/openapi";
// Medication
export enum MedicationActionTypes {
  ACTIVE_MEDICATION = "ACTIVE_MEDICATION",
  LOADED_MEDICATIONS = "LOADED_MEDICATIONS",
  LOADING_MEDICATIONS = "LOADING_MEDICATIONS",
  SET_MEDICATIONS = "SET_MEDICATIONS",
  NEW_MEDICATION = "NEW_MEDICATION",
}

export default interface MedicationState {
  activeMedication: Medication | null;
  loading: boolean;
  medications: Array<Medication> | null;
}

export interface medicationStateActiveMedication {
  type: MedicationActionTypes.ACTIVE_MEDICATION;
  payload: Medication | null;
}

export interface medicationStateLoading {
  type: MedicationActionTypes.LOADING_MEDICATIONS;
}

export interface medicationStateLoaded {
  type: MedicationActionTypes.LOADED_MEDICATIONS;
}

export interface medicationStateSet {
  type: MedicationActionTypes.SET_MEDICATIONS;
  payload: Array<Medication> | null;
}

export interface medicationStateNew {
  type: MedicationActionTypes.NEW_MEDICATION;
}

export type MedicationStateActions =
  | medicationStateActiveMedication
  | medicationStateLoading
  | medicationStateLoaded
  | medicationStateSet
  | medicationStateNew;
