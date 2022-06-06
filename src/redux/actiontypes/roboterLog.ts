import { RoboterLog } from "../../services/openapi";
// RoboterLog
export enum RoboterLogActionTypes {
  LOADED_ROBOTERLOGS = "LOADED_ROBOTERLOGS",
  LOADING_ROBOTERLOGS = "LOADING_ROBOTERLOGS",
}

export default interface RoboterLogState {
  loading: boolean;
  roboterLogs: Array<RoboterLog> | null;
}

export interface roboterLogStateLoading {
  type: RoboterLogActionTypes.LOADING_ROBOTERLOGS;
}

export interface roboterLogStateLoaded {
  type: RoboterLogActionTypes.LOADED_ROBOTERLOGS;
  payload: Array<RoboterLog> | null;
}

export type RoboterLogStateActions =
  | roboterLogStateLoading
  | roboterLogStateLoaded;
