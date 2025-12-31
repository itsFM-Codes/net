package tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.document.BookingDocument;

import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<BookingDocument, String> {

    List<BookingDocument> findByUserId(String userId);

    default BookingDocument updateBooking(BookingDocument booking) {
        assert booking.getId() != null;

        BookingDocument existing = findById(booking.getId())
                .orElseThrow(BookingNotFoundException::new);

        existing.setUserId(booking.getUserId());
        existing.setEventId(booking.getEventId());
        existing.setQuantity(booking.getQuantity());

        return save(existing);
    }
}
