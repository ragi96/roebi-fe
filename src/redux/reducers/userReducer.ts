import { Reducer } from "redux";
import UserState, {
  UserActionTypes,
  UserStateActions,
} from "../actiontypes/user";

import { User } from "../../services/openapi";

const initialState: UserState = {
  activeUser: null,
  loading: false,
  users: null,
};

const UserReducer: Reducer<UserState, UserStateActions> = (
  state = initialState,
  action: UserStateActions
) => {
  switch (action.type) {
    case UserActionTypes.ACTIVE_USER:
      return {
        activeUser: action.payload,
        loading: false,
        users: state.users,
      };
    case UserActionTypes.LOADING_USERS:
      return {
        activeUser: state.activeUser,
        loading: true,
        users: state.users,
      };
    case UserActionTypes.LOADED_USERS:
      return {
        activeUser: null,
        loading: false,
        users: state.users,
      };
    case UserActionTypes.SET_USERS:
      return {
        activeUser: null,
        loading: false,
        users: action.payload,
      };
    case UserActionTypes.NEW_USER:
      const newUser: User = {
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        role: 2,
      };
      return {
        activeUser: newUser,
        loading: false,
        users: state.users,
      };
    default:
      return state;
  }
};

export default UserReducer;
