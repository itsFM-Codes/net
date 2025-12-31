package tpa.network.bookingservice.domain.port.in.query;

import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.Optional;

public interface GetBookingByIdQuery {
    Optional<BookingReadModel> execute(String id);
}
