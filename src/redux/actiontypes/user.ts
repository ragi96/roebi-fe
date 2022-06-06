import { User } from "../../services/openapi";
// User
export enum UserActionTypes {
  ACTIVE_USER = "ACTIVE_USER",
  LOADED_USERS = "LOADED_USERS",
  LOADING_USERS = "LOADING_USERS",
  SET_USERS = "SET_USERS",
  NEW_USER = "NEW_USER",
}

export default interface UserState {
  activeUser: User | null;
  loading: boolean;
  users: Array<User> | null;
}

export interface userStateActiveUser {
  type: UserActionTypes.ACTIVE_USER;
  payload: User | null;
}

export interface userStateLoading {
  type: UserActionTypes.LOADING_USERS;
}

export interface userStateLoaded {
  type: UserActionTypes.LOADED_USERS;
}

export interface userStateSet {
  type: UserActionTypes.SET_USERS;
  payload: Array<User> | null;
}

export interface userStateNew {
  type: UserActionTypes.NEW_USER;
}

export type UserStateActions =
  | userStateActiveUser
  | userStateLoading
  | userStateLoaded
  | userStateSet
  | userStateNew;
