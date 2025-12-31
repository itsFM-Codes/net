package tpa.network.eventservice.infrastructure.adapter.out.persistence.mapper;

import org.springframework.stereotype.Component;
import tpa.network.eventservice.domain.model.event.*;
import tpa.network.eventservice.domain.model.shared.Id;
import tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.document.EventDocument;

@Component
public class EventPersistenceMapper {

    public EventDocument toDocument(Event event) {
        return new EventDocument(
                event.getId().getValue(),
                event.getTitle().getValue(),
                event.getDescription().getValue(),
                event.getImageUrl(),
                event.getDatetime().getValue(),
                event.getDurationMinutes(),
                event.getLocation().getValue(),
                event.getPrice().getValue(),
                event.getCapacity().getValue(),
                event.getSeatsAvailable()
        );
    }

    public Event toEvent(EventDocument eventDocument) {
        return new Event(
                Id.fromString(eventDocument.getId()),
                Title.fromString(eventDocument.getTitle()),
                Description.fromString(eventDocument.getDescription()),
                eventDocument.getImageUrl(),
                EventDateTime.reconstruct(eventDocument.getDatetime()),
                eventDocument.getDurationMinutes(),
                Location.fromString(eventDocument.getLocation()),
                Price.fromDouble(eventDocument.getPrice()),
                Capacity.fromInt(eventDocument.getCapacity()),
                eventDocument.getSeatsAvailable()
        );
    }
}
