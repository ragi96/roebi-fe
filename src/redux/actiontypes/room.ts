import { Room } from "../../services/openapi";
// Room
export enum RoomActionTypes {
  ACTIVE_ROOM = "ACTIVE_ROOM",
  LOADED_ROOMS = "LOADED_ROOMS",
  LOADING_ROOMS = "LOADING_ROOMS",
  SET_ROOMS = "SET_ROOMS",
}

export default interface RoomState {
  activeRoom: Room | null;
  loading: boolean;
  rooms: Array<Room> | null;
}

export interface roomStateActiveRoom {
  type: RoomActionTypes.ACTIVE_ROOM;
  payload: Room | null;
}

export interface roomStateLoading {
  type: RoomActionTypes.LOADING_ROOMS;
}

export interface roomStateLoaded {
  type: RoomActionTypes.LOADED_ROOMS;
}

export interface roomStateSet {
  type: RoomActionTypes.SET_ROOMS;
  payload: Array<Room> | null;
}

export type RoomStateActions =
  | roomStateActiveRoom
  | roomStateLoading
  | roomStateLoaded
  | roomStateSet;
