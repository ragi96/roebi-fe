import { Reducer } from "redux";
import RoboterLogState, {
  RoboterLogActionTypes,
  RoboterLogStateActions,
} from "../actiontypes/roboterLog";

const initialState: RoboterLogState = {
  loading: false,
  roboterLogs: null,
};

const RoboterLogReducer: Reducer<RoboterLogState, RoboterLogStateActions> = (
  state = initialState,
  action: RoboterLogStateActions
) => {
  switch (action.type) {
    case RoboterLogActionTypes.LOADING_ROBOTERLOGS:
      return {
        loading: true,
        roboterLogs: state.roboterLogs,
      };
    case RoboterLogActionTypes.LOADED_ROBOTERLOGS:
      return {
        loading: false,
        roboterLogs: action.payload,
      };
    default:
      return state;
  }
};

export default RoboterLogReducer;
