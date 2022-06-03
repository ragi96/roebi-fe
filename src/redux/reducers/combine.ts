import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import RoomReducer from "./roomReducer";
import MedicineReducer from "./medicineReducer";
import PatientReducer from "./patientReducer";

const reducers = combineReducers({
  user: UserReducer,
  room: RoomReducer,
  medicine: MedicineReducer,
  patient: PatientReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
