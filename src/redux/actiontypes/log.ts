import { Log } from "../../services/openapi";
// Log
export enum LogActionTypes {
  LOADED_LOGS = "LOADED_LOGS",
  LOADING_LOGS = "LOADING_LOGS",
}

export default interface LogState {
  loading: boolean;
  logs: Array<Log> | null;
}

export interface logStateLoading {
  type: LogActionTypes.LOADING_LOGS;
}

export interface logStateLoaded {
  type: LogActionTypes.LOADED_LOGS;
  payload: Array<Log> | null;
}

export type LogStateActions = logStateLoading | logStateLoaded;
