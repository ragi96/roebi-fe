import { Reducer } from "redux";
import LogState, { LogActionTypes, LogStateActions } from "../actiontypes/log";

const initialState: LogState = {
  loading: false,
  logs: null,
};

const LogReducer: Reducer<LogState, LogStateActions> = (
  state = initialState,
  action: LogStateActions
) => {
  switch (action.type) {
    case LogActionTypes.LOADING_LOGS:
      return {
        loading: true,
        logs: state.logs,
      };
    case LogActionTypes.LOADED_LOGS:
      return {
        loading: false,
        logs: action.payload,
      };
    default:
      return state;
  }
};

export default LogReducer;
