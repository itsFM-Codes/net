package tpa.network.eventservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.application.mapper.EventMapper;
import tpa.network.eventservice.domain.exception.EventNotFoundException;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetEventByIdQueryHandler implements GetEventByIdQuery {
    private final EventQueryRepositoryPort queryRepository;
    private final EventMapper mapper;

    @Override
    public EventReadModel execute(GetEventByIdRequest request) {
        log.info("Executing GetEventByIdQuery for eventId: {}", request.eventId());
        
        var event = queryRepository.findById(request.eventId())
                .orElseThrow(() -> {
                    log.warn("Event not found with id: {}", request.eventId());
                    return new EventNotFoundException();
                });

        log.info("Found event with id: {}", request.eventId());
        return mapper.toReadModel(event);
    }
}
