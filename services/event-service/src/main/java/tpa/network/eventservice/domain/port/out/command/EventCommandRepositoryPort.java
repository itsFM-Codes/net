package tpa.network.eventservice.domain.port.out.command;

import tpa.network.eventservice.domain.model.event.Event;
import tpa.network.eventservice.domain.model.shared.Id;

import java.util.Optional;

public interface EventCommandRepositoryPort {
    Event insert(Event event);
    Id deleteById(String id);
    Optional<Integer> decrementSeatsAvailable(String eventId, int quantity);
}
