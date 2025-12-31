export interface BookingWithEvent {
  id: string;
  userId: string;
  eventId: string;
  quantity: number;
  eventTitle: string;
  eventDescription: string;
  eventImageUrl: string;
  eventDatetime: string;
  eventDurationMinutes: number;
  eventLocation: string;
  eventPrice: number;
  eventCapacity: number;
  eventSeatsAvailable: number;
}
