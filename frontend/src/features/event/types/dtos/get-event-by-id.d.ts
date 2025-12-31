import { Event } from "../event";

export interface GetEventByIdRequest {
  id: string;
}

export type GetEventByIdResponse = Event;
