package tpa.network.eventservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.port.in.command.UpdateSeatsCommand;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;

@Slf4j
@Service
@RequiredArgsConstructor
public class UpdateSeatsCommandHandler implements UpdateSeatsCommand {
    private final EventCommandRepositoryPort commandRepository;

    @Override
    public UpdateSeatsResponse execute(UpdateSeatsRequest request) {
        log.info("Executing UpdateSeatsCommand for eventId: {}, quantity: {}", 
                request.eventId(), request.quantity());
        
        try {
            var result = commandRepository.decrementSeatsAvailable(request.eventId(), request.quantity());
            
            if (result.isPresent()) {
                int newSeatsAvailable = result.get();
                log.info("Successfully decremented seats for event {}. New seats available: {}", 
                        request.eventId(), newSeatsAvailable);
                return new UpdateSeatsResponse(true, newSeatsAvailable, null);
            } else {
                log.warn("Failed to decrement seats for event {}. Event not found or insufficient seats.", 
                        request.eventId());
                return new UpdateSeatsResponse(false, 0, "Event not found or insufficient seats available");
            }
        } catch (Exception e) {
            log.error("Error updating seats for event {}: {}", request.eventId(), e.getMessage());
            return new UpdateSeatsResponse(false, 0, e.getMessage());
        }
    }
}
