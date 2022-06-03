import { Reducer } from "redux";
import MedicineState, {
  MedicineActionTypes,
  MedicineStateActions,
} from "../actiontypes/medicine";

import { Medicine } from "../../services/openapi";

const initialState: MedicineState = {
  activeMedicine: null,
  loading: false,
  medicines: null,
};

const MedicineReducer: Reducer<MedicineState, MedicineStateActions> = (
  state = initialState,
  action: MedicineStateActions
) => {
  switch (action.type) {
    case MedicineActionTypes.ACTIVE_MEDICINE:
      return {
        activeMedicine: action.payload,
        loading: false,
        medicines: state.medicines,
      };
    case MedicineActionTypes.LOADING_MEDICINES:
      return {
        activeMedicine: state.activeMedicine,
        loading: true,
        medicines: state.medicines,
      };
    case MedicineActionTypes.LOADED_MEDICINES:
      return {
        activeMedicine: null,
        loading: false,
        medicines: state.medicines,
      };
    case MedicineActionTypes.SET_MEDICINES:
      return {
        activeMedicine: null,
        loading: false,
        medicines: action.payload,
      };
    case MedicineActionTypes.NEW_MEDICINE:
      const newMedicine: Medicine = {
        id: 0,
        name: "",
      };
      return {
        activeMedicine: newMedicine,
        loading: false,
        medicines: state.medicines,
      };
    default:
      return state;
  }
};

export default MedicineReducer;
