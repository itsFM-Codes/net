package tpa.network.bookingservice.domain.port.out.command;

import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;

public interface BookingCommandRepositoryPort {
    Booking insert(Booking booking);
    Id deleteById(String id);
}
