import { Reducer } from "redux";
import RoomState, {
  RoomActionTypes,
  RoomStateActions,
} from "../actiontypes/room";

const initialState: RoomState = {
  activeRoom: null,
  loading: false,
  rooms: null,
};

const RoomReducer: Reducer<RoomState, RoomStateActions> = (
  state = initialState,
  action: RoomStateActions
) => {
  switch (action.type) {
    case RoomActionTypes.ACTIVE_ROOM:
      return {
        activeRoom: action.payload,
        loading: false,
        rooms: state.rooms,
      };
    case RoomActionTypes.LOADING_ROOMS:
      return {
        activeRoom: state.activeRoom,
        loading: true,
        rooms: state.rooms,
      };
    case RoomActionTypes.LOADED_ROOMS:
      return {
        activeRoom: null,
        loading: false,
        rooms: state.rooms,
      };
    case RoomActionTypes.SET_ROOMS:
      return {
        activeRoom: null,
        loading: false,
        rooms: action.payload,
      };
    default:
      return state;
  }
};

export default RoomReducer;
