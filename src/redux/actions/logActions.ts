import { OpenAPI, LogService } from "../../services/openapi";
import { LogActionTypes } from "../actiontypes/log";

const { getLog } = LogService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allLogs = () => {
  return async (dispatch: any) => {
    dispatch({
      type: LogActionTypes.LOADING_LOGS,
    });
    try {
      const response = await getLog();
      dispatch({
        type: LogActionTypes.LOADED_LOGS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
