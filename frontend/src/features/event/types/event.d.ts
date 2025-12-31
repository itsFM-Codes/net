export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  datetime: string;
  durationMinutes: number;
  location: string;
  price: number;
  capacity: number;
  seatsAvailable: number;
}
