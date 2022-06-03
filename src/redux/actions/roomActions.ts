import { OpenAPI, Room, RoomService } from "../../services/openapi";
import { RoomActionTypes } from "../actiontypes/room";

const { getRoom, getRoom1, postRoom, putRoom } = RoomService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const allRooms = () => {
  return async (dispatch: any) => {
    dispatch({
      type: RoomActionTypes.LOADING_ROOMS,
    });
    try {
      const response = await getRoom();
      dispatch({
        type: RoomActionTypes.SET_ROOMS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRoomById = (id: number) => {
  return async (dispatch: any) => {
    try {
      const room = await getRoom1(id);
      if (room.id == null) {
        dispatch({
          type: RoomActionTypes.LOADED_ROOMS,
        });
      } else {
        dispatch({
          type: RoomActionTypes.ACTIVE_ROOM,
          payload: room,
          payloadId: room.id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createRoom = (room: Room) => {
  return async (dispatch: any) => {
    try {
      await postRoom(room);
      dispatch({
        type: RoomActionTypes.LOADED_ROOMS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRoom = (room: Room) => {
  return async (dispatch: any) => {
    try {
      await putRoom(room);
      dispatch({
        type: RoomActionTypes.LOADED_ROOMS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
