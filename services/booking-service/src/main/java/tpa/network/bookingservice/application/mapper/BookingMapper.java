package tpa.network.bookingservice.application.mapper;

import org.springframework.stereotype.Component;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

@Component
public class BookingMapper {

    public BookingReadModel toReadModel(Booking booking) {
        return new BookingReadModel(
                booking.getId().getValue(),
                booking.getUserId().getValue(),
                booking.getEventId().getValue(),
                booking.getQuantity().getValue()
        );
    }
}
