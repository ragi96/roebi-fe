import {
  OpenAPI,
  AuthenticateRequest,
  UserService,
  User,
  UpdateUserDto,
} from "../../services/openapi";
import { UserActionTypes } from "../actiontypes/user";
import type { RootState } from "../../app/store";

const { postUserAuthenticate, getUserCurrent, putCurrent } = UserService;

OpenAPI.BASE = process.env.REACT_APP_API_URI ?? "";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const loginUser = (request: AuthenticateRequest) => {
  return async (dispatch: any) => {
    try {
      const response = await postUserAuthenticate(request);
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
  };
};

export const getUserData = () => {
  return async (dispatch: any) => {
    dispatch({ type: UserActionTypes.LOADING_USER });
    try {
      const user = await getUserCurrent();
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

export const updateCurrentUser = (updateUser: UpdateUserDto) => {
  return async (dispatch: any) => {
    dispatch({ type: UserActionTypes.LOADING_USER });
    try {
      const rep = await putCurrent(updateUser);
      if (rep === 2) {
        dispatch(getUserCurrent);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectCurrentUser = (state: RootState) =>
  state.reducers.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.reducers.user.authenticated;
