export interface CreateEventRequest {
  title: string;
  description: string;
  imageUrl: string;
  datetime: string;
  durationMinutes: number;
  location: string;
  price: number;
  capacity: number;
}

export interface CreateEventResponse {
  id: string;
}
