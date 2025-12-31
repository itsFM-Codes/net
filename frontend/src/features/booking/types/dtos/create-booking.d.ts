export interface CreateBookingRequest {
  userId: string;
  eventId: string;
  quantity: number;
}

export interface CreateBookingResponse {
  id: string;
}
