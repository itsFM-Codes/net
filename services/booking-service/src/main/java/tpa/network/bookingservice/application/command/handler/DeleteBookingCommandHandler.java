package tpa.network.bookingservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.domain.model.shared.Id;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;
import tpa.network.bookingservice.domain.port.out.command.BookingCommandRepositoryPort;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteBookingCommandHandler implements DeleteBookingCommand {
    private final BookingQueryRepositoryPort queryRepository;
    private final BookingCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteBookingRequest request) {
        log.info("Executing DeleteBookingCommand for bookingId: {}", request.id());
        
        if (queryRepository.findById(request.id()).isEmpty()) {
            log.warn("Failed to delete booking - booking not found with id: {}", request.id());
            throw new BookingNotFoundException();
        }

        var deletedId = commandRepository.deleteById(request.id());
        log.info("Successfully deleted booking with id: {}", deletedId.getValue());
        return deletedId;
    }
}
