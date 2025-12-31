import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { GetAllEventsResponse } from "../types/dtos/get-all-events";
import { GetEventByIdResponse } from "../types/dtos/get-event-by-id";
import { CreateEventRequest, CreateEventResponse } from "../types/dtos/create-event";
import { DeleteEventRequest, DeleteEventResponse } from "../types/dtos/delete-event";
import { otelLog } from "@/lib/otel/instrumentation";

const eventClient = new ApiClient(config.EVENT_SERVICE_URL!);

const getAllEvents = async (): Promise<ApiResponse<GetAllEventsResponse>> => {
  otelLog.debug("Fetching all events");
  const result = await eventClient.get<GetAllEventsResponse>("/events");
  if (result.error) {
    otelLog.error("Failed to fetch all events: {}", { error: result.error });
  } else {
    otelLog.debug("Successfully retrieved {} events", { count: result.payload?.length || 0 });
  }
  return result;
}

const getEventById = async (id: string): Promise<ApiResponse<GetEventByIdResponse>> => {
  otelLog.debug("Fetching event by id: {}", { eventId: id });
  const result = await eventClient.get<GetEventByIdResponse>(`/events/${id}`);
  if (result.error) {
    otelLog.warn("Event not found with id: {}", { eventId: id });
  } else {
    otelLog.debug("Successfully retrieved event with id: {}", { eventId: id });
  }
  return result;
}

const createEvent = async (payload: CreateEventRequest): Promise<ApiResponse<CreateEventResponse>> => {
  otelLog.info("Executing CreateEventCommand for title: {}", { title: payload.title });
  const result = await eventClient.post<CreateEventResponse, CreateEventRequest>("/events", payload);
  if (result.error) {
    otelLog.warn("Failed to create event - {}", { title: payload.title, error: result.error });
  } else {
    otelLog.info("Successfully created event");
  }
  return result;
}

const deleteEvent = async (payload: DeleteEventRequest): Promise<ApiResponse<DeleteEventResponse>> => {
  otelLog.info("Executing DeleteEventCommand for eventId: {}", { eventId: payload.id });
  const result = await eventClient.delete<DeleteEventResponse>(`/events/${payload.id}`);
  if (result.error) {
    otelLog.warn("Failed to delete event - event not found with id: {}", { eventId: payload.id });
  } else {
    otelLog.info("Successfully deleted event with id: {}", { eventId: payload.id });
  }
  return result;
}

export const eventService = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
};
