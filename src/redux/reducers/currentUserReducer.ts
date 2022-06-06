import { Reducer } from "redux";
import UserState, {
  CurrentUserActionTypes,
  UserStateActions,
} from "../actiontypes/currentUser";

const initialState: UserState = {
  authenticated: false,
  loading: false,
  currentUser: null,
};

const CurrentUserReducer: Reducer<UserState, UserStateActions> = (
  state = initialState,
  action: UserStateActions
) => {
  switch (action.type) {
    case CurrentUserActionTypes.SET_AUTHENTICATED:
      return {
        loading: state.loading,
        authenticated: true,
        currentUser: state.currentUser,
      };
    case CurrentUserActionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case CurrentUserActionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        currentUser: action.payload,
      };
    case CurrentUserActionTypes.LOADING_USER:
      return {
        authenticated: state.authenticated,
        loading: true,
        currentUser: state.currentUser,
      };
    default:
      return state;
  }
};

export default CurrentUserReducer;
