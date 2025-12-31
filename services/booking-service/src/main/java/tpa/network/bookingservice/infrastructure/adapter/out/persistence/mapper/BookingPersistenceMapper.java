package tpa.network.bookingservice.infrastructure.adapter.out.persistence.mapper;

import org.springframework.stereotype.Component;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.booking.EventId;
import tpa.network.bookingservice.domain.model.booking.Quantity;
import tpa.network.bookingservice.domain.model.booking.UserId;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.document.BookingDocument;

@Component
public class BookingPersistenceMapper {

    public BookingDocument toDocument(Booking booking) {
        return new BookingDocument(
                booking.getId().getValue(),
                booking.getUserId().getValue(),
                booking.getEventId().getValue(),
                booking.getQuantity().getValue()
        );
    }

    public Booking toBooking(BookingDocument bookingDocument) {
        return new Booking(
                Id.fromString(bookingDocument.getId()),
                UserId.fromString(bookingDocument.getUserId()),
                EventId.fromString(bookingDocument.getEventId()),
                Quantity.fromInt(bookingDocument.getQuantity())
        );
    }

    public BookingReadModel toReadModel(BookingDocument bookingDocument) {
        return new BookingReadModel(
                bookingDocument.getId(),
                bookingDocument.getUserId(),
                bookingDocument.getEventId(),
                bookingDocument.getQuantity()
        );
    }
}
