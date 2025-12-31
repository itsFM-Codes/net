package tpa.network.bookingservice.infrastructure.adapter.in.rest.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;
import tpa.network.bookingservice.infrastructure.adapter.in.rest.command.dto.*;

@Slf4j
@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingCommandController {

    private final CreateBookingCommand createBookingCommand;
    private final DeleteBookingCommand deleteBookingCommand;

    @PostMapping
    public ResponseEntity<CreateBookingResponse> createBooking(@RequestBody CreateBookingRequest request) {
        log.info("REST API - Received request to create booking for userId: {}, eventId: {}", 
                request.userId(), request.eventId());
        var dto = new CreateBookingCommand.CreateBookingRequest(
                request.userId(), request.eventId(), request.quantity()
        );

        var id = createBookingCommand.execute(dto);
        log.info("REST API - Successfully created booking with id: {}", id.getValue());
        return ResponseEntity.ok(new CreateBookingResponse(id.getValue()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteBookingResponse> deleteBooking(@PathVariable String id) {
        log.info("REST API - Received request to delete booking with id: {}", id);
        var dto = new DeleteBookingCommand.DeleteBookingRequest(id);

        var bookingId = deleteBookingCommand.execute(dto);
        log.info("REST API - Successfully deleted booking with id: {}", bookingId.getValue());
        return ResponseEntity.ok(new DeleteBookingResponse(bookingId.getValue()));
    }
}
