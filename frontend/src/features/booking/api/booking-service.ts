import config from "@/lib/api/config";
import ApiClient from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/response";
import { GetAllBookingsResponse } from "../types/dtos/get-all-bookings";
import { GetBookingByIdResponse } from "../types/dtos/get-booking-by-id";
import { CreateBookingRequest, CreateBookingResponse } from "../types/dtos/create-booking";
import { DeleteBookingRequest, DeleteBookingResponse } from "../types/dtos/delete-booking";
import { GetBookingsByUserIdResponse } from "../types/dtos/get-bookings-by-user-id";
import { otelLog } from "@/lib/otel/instrumentation";

const bookingClient = new ApiClient(config.BOOKING_SERVICE_URL!);

const getAllBookings = async (): Promise<ApiResponse<GetAllBookingsResponse>> => {
  otelLog.debug("Fetching all bookings");
  const result = await bookingClient.get<GetAllBookingsResponse>("/bookings");
  if (result.error) {
    otelLog.error("Failed to fetch all bookings: {}", { error: result.error });
  } else {
    otelLog.debug("Successfully retrieved {} bookings", { count: result.payload?.bookings.length || 0 });
  }
  return result;
}

const getBookingById = async (id: string): Promise<ApiResponse<GetBookingByIdResponse>> => {
  otelLog.debug("Fetching booking by id: {}", { bookingId: id });
  const result = await bookingClient.get<GetBookingByIdResponse>(`/bookings/${id}`);
  if (result.error) {
    otelLog.warn("Booking not found with id: {}", { bookingId: id });
  } else {
    otelLog.debug("Successfully retrieved booking with id: {}", { bookingId: id });
  }
  return result;
}

const getBookingsByUserId = async (userId: string): Promise<ApiResponse<GetBookingsByUserIdResponse>> => {
  otelLog.info("Fetching bookings for userId: {}", { userId });
  const result = await bookingClient.get<GetBookingsByUserIdResponse>(`/bookings/user/${userId}`);
  if (result.error) {
    otelLog.error("Failed to fetch bookings for userId: {}", { userId, error: result.error });
  } else {
    otelLog.info("Successfully retrieved {} bookings for userId: {}", { count: result.payload?.length || 0, userId });
  }
  return result;
}

const createBooking = async (payload: CreateBookingRequest): Promise<ApiResponse<CreateBookingResponse>> => {
  otelLog.info("Executing CreateBookingCommand for userId: {}, eventId: {}", { userId: payload.userId, eventId: payload.eventId });
  const result = await bookingClient.post<CreateBookingResponse, CreateBookingRequest>("/bookings", payload);
  if (result.error) {
    otelLog.warn("Failed to create booking - {}", { userId: payload.userId, eventId: payload.eventId, error: result.error });
  } else {
    otelLog.info("Successfully created booking");
  }
  return result;
}

const deleteBooking = async (payload: DeleteBookingRequest): Promise<ApiResponse<DeleteBookingResponse>> => {
  otelLog.info("Executing DeleteBookingCommand for bookingId: {}", { bookingId: payload.id });
  const result = await bookingClient.delete<DeleteBookingResponse>(`/bookings/${payload.id}`);
  if (result.error) {
    otelLog.warn("Failed to delete booking - booking not found with id: {}", { bookingId: payload.id });
  } else {
    otelLog.info("Successfully deleted booking with id: {}", { bookingId: payload.id });
  }
  return result;
}

export const bookingService = {
  getAllBookings,
  getBookingById,
  getBookingsByUserId,
  createBooking,
  deleteBooking,
};
