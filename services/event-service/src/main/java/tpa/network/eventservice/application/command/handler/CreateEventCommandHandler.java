package tpa.network.eventservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateEventCommandHandler implements CreateEventCommand {
    private final EventCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateEventRequest request) {
        log.info("Executing CreateEventCommand for title: {}", request.title());
        
        Event event = Event.create(
                request.title(),
                request.description(),
                request.imageUrl(),
                request.datetime(),
                request.durationMinutes(),
                request.location(),
                request.price(),
                request.capacity()
        );

        Event savedEvent = commandRepository.insert(event);
        log.info("Successfully created event with id: {}", savedEvent.getId().getValue());
        return savedEvent.getId();
    }
}
