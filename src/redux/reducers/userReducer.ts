import { Reducer } from "redux";
import UserState, {
  UserActionTypes,
  UserStateActions,
} from "../actiontypes/user";

const initialState: UserState = {
  authenticated: false,
  loading: false,
  currentUser: null,
};

const UserReducer: Reducer<UserState, UserStateActions> = (
  state = initialState,
  action: UserStateActions
) => {
  switch (action.type) {
    case UserActionTypes.SET_AUTHENTICATED:
      return {
        loading: state.loading,
        authenticated: true,
        currentUser: state.currentUser,
      };
    case UserActionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case UserActionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        currentUser: action.payload,
      };
    case UserActionTypes.LOADING_USER:
      return {
        authenticated: state.authenticated,
        loading: true,
        currentUser: state.currentUser,
      };
    default:
      return state;
  }
};

export default UserReducer;
