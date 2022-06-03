import { User } from "../../services/openapi";

export enum UserActionTypes {
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
  type: UserActionTypes.SET_UNAUTHENTICATED;
}

export interface userStateAuthenticated {
  type: UserActionTypes.SET_AUTHENTICATED;
}

export interface userStateLoading {
  type: UserActionTypes.LOADING_USER;
}

export interface userStateSet {
  type: UserActionTypes.SET_USER;
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
