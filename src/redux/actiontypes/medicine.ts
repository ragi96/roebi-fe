import { Medicine } from "../../services/openapi";
// Medicine
export enum MedicineActionTypes {
  ACTIVE_MEDICINE = "ACTIVE_MEDICINE",
  LOADED_MEDICINES = "LOADED_MEDICINES",
  LOADING_MEDICINES = "LOADING_MEDICINES",
  SET_MEDICINES = "SET_MEDICINES",
  NEW_MEDICINE = "NEW_MEDICINE",
}

export default interface MedicineState {
  activeMedicine: Medicine | null;
  loading: boolean;
  medicines: Array<Medicine> | null;
}

export interface medicineStateActiveMedicine {
  type: MedicineActionTypes.ACTIVE_MEDICINE;
  payload: Medicine | null;
}

export interface medicineStateLoading {
  type: MedicineActionTypes.LOADING_MEDICINES;
}

export interface medicineStateLoaded {
  type: MedicineActionTypes.LOADED_MEDICINES;
}

export interface medicineStateSet {
  type: MedicineActionTypes.SET_MEDICINES;
  payload: Array<Medicine> | null;
}

export interface medicineStateNew {
  type: MedicineActionTypes.NEW_MEDICINE;
}

export type MedicineStateActions =
  | medicineStateActiveMedicine
  | medicineStateLoading
  | medicineStateLoaded
  | medicineStateSet
  | medicineStateNew;
