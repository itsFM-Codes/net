import { Booking } from "../booking";

export interface GetBookingByIdRequest {
  id: string;
}

export interface GetBookingByIdResponse {
  booking: Booking;
}
