import {
  OpenAPI,
  AuthenticateRequest,
  UserService,
} from "../../services/openapi";
import { SET_USER, SET_UNAUTHENTICATED, LOADING_USER } from "../actiontypes/index";

const { postUserAuthenticate, getUserCurrent } = UserService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const loginUser = (request: AuthenticateRequest) => {
  return async (dispatch: any) => {
    try {
      let response = await postUserAuthenticate(request);
      console.log(response);
      OpenAPI.TOKEN = response.token ?? '';
      localStorage.setItem("bearer", response.token ?? '');
      console.log('success');
      if (response.user != null) {
        dispatch(getUserData());
      }
      window.location.href = '/dashboard'
    } catch (err) {
      console.log('error')
    }
  };
};

export const getUserData = () => {
  return async (dispatch: any) => {
    dispatch({ type: LOADING_USER });
    try {
      let user = await getUserCurrent();
      if (user != null) {
        dispatch({
          type: SET_USER,
          payload: user
         })
      }
    } catch (err) {
      console.log(err)
    }
  };
};

export const logoutUser = () => (dispatch: any) => {
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  console.log('logout');
  window.location.href = '/'
};
