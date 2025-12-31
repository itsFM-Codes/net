package tpa.network.bookingservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mapper.BookingPersistenceMapper;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.repository.BookingRepository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class BookingCommandRepositoryAdapter implements BookingCommandRepositoryPort {
    private final BookingRepository repository;
    private final BookingPersistenceMapper mapper;

    @Override
    public Booking insert(Booking booking) {
        log.debug("Inserting booking into database");
        var bookingDocument = mapper.toDocument(booking);
        var insertedBooking = repository.save(bookingDocument);
        log.debug("Successfully inserted booking with id: {}", insertedBooking.getId());
        return mapper.toBooking(insertedBooking);
    }

    @Override
    public Id deleteById(String id) {
        log.debug("Deleting booking from database with id: {}", id);
        repository.deleteById(id);
        log.debug("Successfully deleted booking with id: {}", id);
        return Id.fromString(id);
    }
}
