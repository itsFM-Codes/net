package tpa.network.bookingservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetBookingByIdQueryHandler implements GetBookingByIdQuery {
    private final BookingQueryRepositoryPort queryRepository;

    @Override
    public Optional<BookingReadModel> execute(String id) {
        log.info("Executing GetBookingByIdQuery for bookingId: {}", id);
        var booking = queryRepository.findById(id);
        if (booking.isPresent()) {
            log.info("Successfully retrieved booking with id: {}", id);
        } else {
            log.warn("Booking not found with id: {}", id);
        }
        return booking;
    }
}
