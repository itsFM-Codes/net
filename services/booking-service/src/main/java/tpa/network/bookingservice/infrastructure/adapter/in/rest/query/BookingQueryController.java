package tpa.network.bookingservice.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.domain.port.in.query.GetBookingsByUserIdQuery;
import tpa.network.bookingservice.infrastructure.adapter.in.rest.query.dto.BookingResponse;
import tpa.network.bookingservice.infrastructure.adapter.in.rest.query.dto.BookingWithEventResponse;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingQueryController {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;
    private final GetBookingsByUserIdQuery getBookingsByUserIdQuery;

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        log.info("REST API - Received request to get all bookings");
        var bookings = getAllBookingsQuery.execute();
        var response = bookings.stream()
                .map(b -> new BookingResponse(b.id(), b.userId(), b.eventId(), b.quantity()))
                .toList();
        log.info("REST API - Found {} bookings", response.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable String id) {
        log.info("REST API - Received request to get booking by id: {}", id);
        return getBookingByIdQuery.execute(id)
                .map(b -> new BookingResponse(b.id(), b.userId(), b.eventId(), b.quantity()))
                .map(response -> {
                    log.info("REST API - Found booking with id: {}", id);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    log.warn("REST API - Booking not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingWithEventResponse>> getBookingsByUserId(@PathVariable String userId) {
        log.info("REST API - Received request to get bookings for userId: {}", userId);
        var bookings = getBookingsByUserIdQuery.execute(userId);
        var response = bookings.stream()
                .map(b -> new BookingWithEventResponse(
                        b.id(),
                        b.userId(),
                        b.eventId(),
                        b.quantity(),
                        b.eventTitle(),
                        b.eventDescription(),
                        b.eventImageUrl(),
                        b.eventDatetime(),
                        b.eventDurationMinutes(),
                        b.eventLocation(),
                        b.eventPrice(),
                        b.eventCapacity(),
                        b.eventSeatsAvailable()
                ))
                .toList();
        log.info("REST API - Found {} bookings for userId: {}", response.size(), userId);
        return ResponseEntity.ok(response);
    }
}
