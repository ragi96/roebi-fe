import { combineReducers } from "redux";
import userReducer from "./userReducer";
import roomReducer from "./roomReducer";
import MedicineReducer from "./medicineReducer";

const reducers = combineReducers({
  user: userReducer,
  room: roomReducer,
  medicine: MedicineReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
