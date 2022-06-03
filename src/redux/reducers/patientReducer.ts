import { Reducer } from "redux";
import PatientState, {
  PatientActionTypes,
  PatientStateActions,
} from "../actiontypes/patient";

import { Patient } from "../../services/openapi";

const initialState: PatientState = {
  activePatient: null,
  loading: false,
  patients: null,
};

const PatientReducer: Reducer<PatientState, PatientStateActions> = (
  state = initialState,
  action: PatientStateActions
) => {
  switch (action.type) {
    case PatientActionTypes.ACTIVE_PATIENT:
      return {
        activePatient: action.payload,
        loading: false,
        patients: state.patients,
      };
    case PatientActionTypes.LOADING_PATIENTS:
      return {
        activePatient: state.activePatient,
        loading: true,
        patients: state.patients,
      };
    case PatientActionTypes.LOADED_PATIENTS:
      return {
        activePatient: null,
        loading: false,
        patients: state.patients,
      };
    case PatientActionTypes.SET_PATIENTS:
      return {
        activePatient: null,
        loading: false,
        patients: action.payload,
      };
    case PatientActionTypes.NEW_PATIENT:
      const newPatient: Patient = {
        id: 0,
        firstname: "",
        lastName: "",
        caseHistory: "",
        entryStamp: Math.floor(Date.now() / 1000),
        exitStamp: 0,
      };
      return {
        activePatient: newPatient,
        loading: false,
        patients: state.patients,
      };
    default:
      return state;
  }
};

export default PatientReducer;
