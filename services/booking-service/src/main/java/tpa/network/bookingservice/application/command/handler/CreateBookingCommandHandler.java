package tpa.network.bookingservice.application.command.handler;

import java.time.Instant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tpa.network.bookingservice.domain.exception.EventAlreadyPassedException;
import tpa.network.bookingservice.domain.exception.EventNotFoundException;
import tpa.network.bookingservice.domain.exception.InsufficientSeatsException;
import tpa.network.bookingservice.domain.exception.UserNotFoundException;
import tpa.network.bookingservice.domain.model.booking.Booking;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.domain.port.out.grpc.EventServicePort;
import tpa.network.bookingservice.domain.port.out.grpc.UserServicePort;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateBookingCommandHandler implements CreateBookingCommand {
    private final BookingCommandRepositoryPort commandRepository;
    private final UserServicePort userServicePort;
    private final EventServicePort eventServicePort;

    @Override
    public Id execute(CreateBookingRequest request) {
        log.info("Executing CreateBookingCommand for userId: {}, eventId: {}, quantity: {}", 
                request.userId(), request.eventId(), request.quantity());
        
        if (!userServicePort.existsById(request.userId())) {
            log.warn("Failed to create booking - user not found with id: {}", request.userId());
            throw new UserNotFoundException(request.userId());
        }

        var eventOpt = eventServicePort.getEventById(request.eventId());
        if (eventOpt.isEmpty()) {
            log.warn("Failed to create booking - event not found with id: {}", request.eventId());
            throw new EventNotFoundException(request.eventId());
        }
        
        var event = eventOpt.get();
        if (event.datetime().isBefore(Instant.now())) {
            log.warn("Failed to create booking - event {} has already passed", request.eventId());
            throw new EventAlreadyPassedException(request.eventId());
        }

        var updateResult = eventServicePort.updateSeats(request.eventId(), request.quantity());
        if (!updateResult.success()) {
            log.warn("Failed to reserve seats for event {}. Reason: {}", 
                    request.eventId(), updateResult.errorMessage());
            throw new InsufficientSeatsException(request.eventId(), request.quantity());
        }
        
        log.info("Successfully reserved {} seats for event {}. Remaining seats: {}", 
                request.quantity(), request.eventId(), updateResult.seatsAvailable());

        Booking booking = Booking.create(
                request.userId(),
                request.eventId(),
                request.quantity()
        );

        Booking savedBooking = commandRepository.insert(booking);
        log.info("Successfully created booking with id: {}", savedBooking.getId().getValue());
        return savedBooking.getId();
    }
}
