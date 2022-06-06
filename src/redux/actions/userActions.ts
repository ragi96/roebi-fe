import {
  AddUserDto,
  OpenAPI,
  UpdateUserDto,
  UserService,
  PasswordUpdate,
  PasswordCurrentUpdate,
} from "../../services/openapi";
import { UserActionTypes } from "../actiontypes/user";

const { getUser, getUser1, postUser, putUser, putUserChangePassword } =
  UserService;

OpenAPI.BASE = process.env.REACT_APP_API_URI ?? "";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allUsers = () => {
  return async (dispatch: any) => {
    dispatch({
      type: UserActionTypes.LOADING_USERS,
    });
    try {
      const response = await getUser();
      dispatch({
        type: UserActionTypes.SET_USERS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserById = (id: number) => {
  return async (dispatch: any) => {
    try {
      const user = await getUser1(id);
      if (user.id == null) {
        dispatch({
          type: UserActionTypes.LOADED_USERS,
        });
      } else {
        dispatch({
          type: UserActionTypes.ACTIVE_USER,
          payload: user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePasswordOfUser = (updatePassword: PasswordUpdate) => {
  return async (dispatch: any) => {
    dispatch({ type: UserActionTypes.LOADING_USERS });
    try {
      const rep = await putUserChangePassword(updatePassword);
      if (rep === 2) {
        dispatch(allUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const newUser = () => {
  return async (dispatch: any) => {
    dispatch({
      type: UserActionTypes.NEW_USER,
    });
  };
};

export const loadUsers = () => {
  return async (dispatch: any) => {
    dispatch({
      type: UserActionTypes.LOADED_USERS,
    });
  };
};

export const createUser = (user: AddUserDto) => {
  return async (dispatch: any) => {
    try {
      await postUser(user);
      dispatch({
        type: UserActionTypes.LOADED_USERS,
      });
      dispatch(allUsers());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (user: UpdateUserDto) => {
  return async (dispatch: any) => {
    try {
      await putUser(user);
      dispatch({
        type: UserActionTypes.LOADED_USERS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
