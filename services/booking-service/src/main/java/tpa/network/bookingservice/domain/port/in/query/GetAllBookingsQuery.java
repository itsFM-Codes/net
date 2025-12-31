package tpa.network.bookingservice.domain.port.in.query;

import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.List;

public interface GetAllBookingsQuery {
    List<BookingReadModel> execute();
}
