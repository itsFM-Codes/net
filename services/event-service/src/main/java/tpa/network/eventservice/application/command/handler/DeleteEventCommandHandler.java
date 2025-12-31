package tpa.network.eventservice.application.command.handler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.exception.EventNotFoundException;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;

@Slf4j
@Service
@AllArgsConstructor
public class DeleteEventCommandHandler implements DeleteEventCommand {
    private final EventQueryRepositoryPort queryRepository;
    private final EventCommandRepositoryPort commandRepository;

    @Override
    public Id execute(DeleteEventRequest request) {
        log.info("Executing DeleteEventCommand for eventId: {}", request.eventId());
        
        if (queryRepository.findById(request.eventId()).isEmpty()) {
            log.warn("Failed to delete event - event not found with id: {}", request.eventId());
            throw new EventNotFoundException();
        }

        var deletedId = commandRepository.deleteById(request.eventId());
        log.info("Successfully deleted event with id: {}", deletedId.getValue());
        return deletedId;
    }
}
