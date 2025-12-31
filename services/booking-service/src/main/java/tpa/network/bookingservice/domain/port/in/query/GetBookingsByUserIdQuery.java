package tpa.network.bookingservice.domain.port.in.query;

import tpa.network.bookingservice.domain.readmodel.BookingWithEventReadModel;

import java.util.List;

public interface GetBookingsByUserIdQuery {
    List<BookingWithEventReadModel> execute(String userId);
}
