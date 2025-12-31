package tpa.network.eventservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper.EventPersistenceMapper;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository.EventRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventQueryRepositoryAdapter implements EventQueryRepositoryPort {
    private final EventRepository repository;
    private final EventPersistenceMapper mapper;

    @Override
    public List<Event> findAll() {
        log.debug("Querying database for all events");
        
        var events = repository.findAll()
                .stream()
                .map(mapper::toEvent)
                .collect(Collectors.toList());
        
        log.debug("Retrieved {} events from database", events.size());
        return events;
    }

    @Override
    public Optional<Event> findById(String id) {
        log.debug("Querying database for event with id: {}", id);
        
        var event = repository.findById(id)
                .map(mapper::toEvent);
        
        if (event.isPresent()) {
            log.debug("Found event in database with id: {}", id);
        } else {
            log.debug("Event not found in database with id: {}", id);
        }
        
        return event;
    }
}
