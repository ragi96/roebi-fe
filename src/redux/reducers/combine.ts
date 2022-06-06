import { combineReducers } from "redux";
import CurrentUserReducer from "./currentUserReducer";
import RoomReducer from "./roomReducer";
import MedicineReducer from "./medicineReducer";
import PatientReducer from "./patientReducer";
import MedicationReducer from "./medicationReducer";
import LogReducer from "./logReducer";
import RoboterLogReducer from "./roboterLogReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
  user: CurrentUserReducer,
  users: UserReducer,
  room: RoomReducer,
  medicine: MedicineReducer,
  patient: PatientReducer,
  medication: MedicationReducer,
  roboterLog: RoboterLogReducer,
  log: LogReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
