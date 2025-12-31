package tpa.network.eventservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.application.mapper.EventMapper;
import tpa.network.eventservice.domain.port.in.query.GetAllEventsQuery;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetAllEventsQueryHandler implements GetAllEventsQuery {
    private final EventQueryRepositoryPort queryRepository;
    private final EventMapper mapper;

    @Override
    public List<EventReadModel> execute() {
        log.info("Executing GetAllEventsQuery");
        
        var events = queryRepository.findAll()
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
        
        log.info("Retrieved {} events", events.size());
        return events;
    }
}
