package tpa.network.bookingservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetBookingsByUserIdQuery;
import tpa.network.bookingservice.domain.port.out.grpc.EventServicePort;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingWithEventReadModel;
import tpa.network.bookingservice.domain.readmodel.EventReadModel;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetBookingsByUserIdQueryHandler implements GetBookingsByUserIdQuery {
    private final BookingQueryRepositoryPort queryRepository;
    private final EventServicePort eventServicePort;

    @Override
    public List<BookingWithEventReadModel> execute(String userId) {
        log.info("Executing GetBookingsByUserIdQuery for userId: {}", userId);
        var bookings = queryRepository.findByUserId(userId);
        
        var result = bookings.stream()
                .map(booking -> {
                    var eventOpt = eventServicePort.getEventById(booking.eventId());
                    if (eventOpt.isPresent()) {
                        EventReadModel event = eventOpt.get();
                        return new BookingWithEventReadModel(
                                booking.id(),
                                booking.userId(),
                                booking.eventId(),
                                booking.quantity(),
                                event.title(),
                                event.description(),
                                event.imageUrl(),
                                event.datetime(),
                                event.durationMinutes(),
                                event.location(),
                                event.price(),
                                event.capacity(),
                                event.seatsAvailable()
                        );
                    }
                    return new BookingWithEventReadModel(
                            booking.id(),
                            booking.userId(),
                            booking.eventId(),
                            booking.quantity(),
                            "Event Unavailable",
                            "",
                            "",
                            null,
                            0,
                            "",
                            0.0,
                            0,
                            0
                    );
                })
                .toList();
        
        log.info("Successfully retrieved {} bookings with event details for userId: {}", result.size(), userId);
        return result;
    }
}
