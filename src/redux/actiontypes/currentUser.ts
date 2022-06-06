import { User } from "../../services/openapi";

export enum CurrentUserActionTypes {
  SET_AUTHENTICATED = "SET_AUTHENTICATED",
  SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED",
  SET_USER = "SET_USER",
  LOADING_USER = "LOADING_USER",
}

export default interface UserState {
  authenticated: boolean;
  loading: boolean;
  currentUser: User | null;
}

export interface userStateUnauthenticated {
  type: CurrentUserActionTypes.SET_UNAUTHENTICATED;
}

export interface userStateAuthenticated {
  type: CurrentUserActionTypes.SET_AUTHENTICATED;
}

export interface userStateLoading {
  type: CurrentUserActionTypes.LOADING_USER;
}

export interface userStateSet {
  type: CurrentUserActionTypes.SET_USER;
  payload: User;
}

export type UserStateActions =
  | userStateUnauthenticated
  | userStateAuthenticated
  | userStateLoading
  | userStateSet;

//UI reducer types
export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
