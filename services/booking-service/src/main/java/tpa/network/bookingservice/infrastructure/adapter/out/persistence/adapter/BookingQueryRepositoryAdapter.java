package tpa.network.bookingservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mapper.BookingPersistenceMapper;
import tpa.network.bookingservice.infrastructure.adapter.out.persistence.mongodb.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class BookingQueryRepositoryAdapter implements BookingQueryRepositoryPort {
    private final BookingRepository repository;
    private final BookingPersistenceMapper mapper;

    @Override
    public List<BookingReadModel> findAll() {
        log.debug("Querying all bookings from database");
        var bookings = repository.findAll().stream()
                .map(mapper::toReadModel)
                .toList();
        log.debug("Found {} bookings in database", bookings.size());
        return bookings;
    }

    @Override
    public Optional<BookingReadModel> findById(String id) {
        log.debug("Querying booking by id: {} from database", id);
        var booking = repository.findById(id)
                .map(mapper::toReadModel);
        if (booking.isPresent()) {
            log.debug("Found booking with id: {}", id);
        } else {
            log.debug("Booking not found with id: {}", id);
        }
        return booking;
    }

    @Override
    public List<BookingReadModel> findByUserId(String userId) {
        log.debug("Querying bookings by userId: {} from database", userId);
        var bookings = repository.findByUserId(userId).stream()
                .map(mapper::toReadModel)
                .toList();
        log.debug("Found {} bookings for userId: {}", bookings.size(), userId);
        return bookings;
    }
}
