package tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tpa.network.eventservice.domain.exception.EventNotFoundException;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.document.EventDocument;

@Repository
public interface EventRepository extends MongoRepository<EventDocument, String> {
}
