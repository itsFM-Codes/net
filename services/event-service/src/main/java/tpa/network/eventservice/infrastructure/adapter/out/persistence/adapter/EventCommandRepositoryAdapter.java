package tpa.network.eventservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.domain.port.out.command.EventCommandRepositoryPort;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper.EventPersistenceMapper;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.document.EventDocument;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository.EventRepository;

import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EventCommandRepositoryAdapter implements EventCommandRepositoryPort {
    private final EventRepository repository;
    private final EventPersistenceMapper mapper;
    private final MongoTemplate mongoTemplate;

    @Override
    public Event insert(Event event) {
        log.debug("Inserting event into database with id: {}", event.getId().getValue());
        
        var eventDocument = mapper.toDocument(event);
        var insertedEvent = repository.save(eventDocument);
        
        log.debug("Successfully inserted event with id: {}", insertedEvent.getId());
        return mapper.toEvent(insertedEvent);
    }

    @Override
    public Id deleteById(String id) {
        log.debug("Deleting event from database with id: {}", id);
        
        repository.deleteById(id);
        
        log.debug("Successfully deleted event with id: {}", id);
        return Id.fromString(id);
    }

    @Override
    public Optional<Integer> decrementSeatsAvailable(String eventId, int quantity) {
        log.debug("Decrementing seats available for event {} by {}", eventId, quantity);
        
        Query query = new Query(Criteria.where("_id").is(eventId)
                .and("seatsAvailable").gte(quantity));
        
        Update update = new Update().inc("seatsAvailable", -quantity);
        
        var result = mongoTemplate.findAndModify(query, update, EventDocument.class);
        
        if (result != null) {
            int newSeatsAvailable = result.getSeatsAvailable() - quantity;
            log.debug("Successfully decremented seats. New available: {}", newSeatsAvailable);
            return Optional.of(newSeatsAvailable);
        }
        
        log.warn("Failed to decrement seats for event {}", eventId);
        return Optional.empty();
    }
}
