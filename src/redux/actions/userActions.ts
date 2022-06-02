import {
  OpenAPI,
  AuthenticateRequest,
  UserService,
  User
} from "../../services/openapi";
import { UserActionTypes } from "../actiontypes/index";
import type { RootState } from "../../app/store";

const { postUserAuthenticate, getUserCurrent } = UserService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const loginUser = (request: AuthenticateRequest) => {
  return async (dispatch: any) => {
    try {
      let response = await postUserAuthenticate(request);
      OpenAPI.TOKEN = response.token ?? "";
      localStorage.setItem("bearer", response.token ?? "");
      if (response.user != null) {
        dispatch(setUserData(response.user));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const setUserData = (user: User) => {
  return (dispatch: any) => {
    dispatch({
      type: UserActionTypes.SET_USER,
      payload: user,
    });
}
}

export const getUserData = () => {
  return async (dispatch: any) => {
    dispatch({ type: UserActionTypes.LOADING_USER });
    try {
      let user = await getUserCurrent();
      if (user != null) {
        dispatch({
          type: UserActionTypes.SET_USER,
          payload: user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = () => (dispatch: any) => {
  dispatch({
    type: UserActionTypes.SET_UNAUTHENTICATED,
  });
  localStorage.setItem("bearer", "");
  window.location.href = "/";
};

export const selectCurrentUser = (state: RootState) =>
  state.reducers.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.reducers.user.authenticated;
