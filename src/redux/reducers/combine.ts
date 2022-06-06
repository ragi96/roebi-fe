import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import RoomReducer from "./roomReducer";
import MedicineReducer from "./medicineReducer";
import PatientReducer from "./patientReducer";
import MedicationReducer from "./medicationReducer";
import LogReducer from "./logReducer";
import RoboterLogReducer from "./roboterLogReducer";

const reducers = combineReducers({
  user: UserReducer,
  room: RoomReducer,
  medicine: MedicineReducer,
  patient: PatientReducer,
  medication: MedicationReducer,
  roboterLog: RoboterLogReducer,
  log: LogReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
