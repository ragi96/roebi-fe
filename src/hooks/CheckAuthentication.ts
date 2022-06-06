import jwtDecode from "jwt-decode"; //you must install jwt-decode using npm
import { logoutUser, getUserData } from "../redux/actions/currentUserActions";
import { store } from "../app/store";
import { CurrentUserActionTypes } from "../redux/actiontypes/currentUser";

export const CheckAuthentication = () => {
  const authToken = localStorage.getItem("bearer");
  if (authToken) {
    const decodedToken: any = jwtDecode(authToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
    } else {
      store.dispatch({ type: CurrentUserActionTypes.SET_AUTHENTICATED });
      store.dispatch(getUserData());
    }
  }
};
