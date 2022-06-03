import { Reducer } from "redux";
import MedicationState, {
  MedicationActionTypes,
  MedicationStateActions,
} from "../actiontypes/medication";

import { Medication, Medicine, Patient } from "../../services/openapi";

const initialState: MedicationState = {
  activeMedication: null,
  loading: false,
  medications: null,
};

const MedicationReducer: Reducer<MedicationState, MedicationStateActions> = (
  state = initialState,
  action: MedicationStateActions
) => {
  switch (action.type) {
    case MedicationActionTypes.ACTIVE_MEDICATION:
      return {
        activeMedication: action.payload,
        loading: false,
        medications: state.medications,
      };
    case MedicationActionTypes.LOADING_MEDICATIONS:
      return {
        activeMedication: state.activeMedication,
        loading: true,
        medications: state.medications,
      };
    case MedicationActionTypes.LOADED_MEDICATIONS:
      return {
        activeMedication: null,
        loading: false,
        medications: state.medications,
      };
    case MedicationActionTypes.SET_MEDICATIONS:
      return {
        activeMedication: null,
        loading: false,
        medications: action.payload,
      };
    case MedicationActionTypes.NEW_MEDICATION:
      const newPatient: Patient = {
        id: 0,
      };
      const newMedicine: Medicine = {
        id: 0,
        name: "",
      };
      const newMedication: Medication = {
        id: 0,
        patient: newPatient,
        takingStamp: 0,
        medicine: newMedicine,
      };
      return {
        activeMedication: newMedication,
        loading: false,
        medications: state.medications,
      };
    default:
      return state;
  }
};

export default MedicationReducer;
