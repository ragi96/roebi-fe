import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import RoomReducer from "./roomReducer";
import MedicineReducer from "./medicineReducer";
import PatientReducer from "./patientReducer";
import MedicationReducer from "./medicationReducer";

const reducers = combineReducers({
  user: UserReducer,
  room: RoomReducer,
  medicine: MedicineReducer,
  patient: PatientReducer,
  medication: MedicationReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
