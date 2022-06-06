import { OpenAPI, RoboterLogService } from "../../services/openapi";
import { RoboterLogActionTypes } from "../actiontypes/roboterLog";

const { getRoboterLog } = RoboterLogService;

OpenAPI.BASE = process.env.REACT_APP_API_URI ?? "";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allRoboterLogs = () => {
  return async (dispatch: any) => {
    dispatch({
      type: RoboterLogActionTypes.LOADING_ROBOTERLOGS,
    });
    try {
      const response = await getRoboterLog();
      dispatch({
        type: RoboterLogActionTypes.LOADED_ROBOTERLOGS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
