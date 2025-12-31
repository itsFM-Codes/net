package tpa.network.eventservice.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.eventservice.domain.port.in.query.GetAllEventsQuery;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.infrastructure.adapter.in.rest.query.dto.EventResponse;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventQueryController {
    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        log.info("REST API - Received request to get all events");
        
        var events = getAllEventsQuery.execute();
        log.info("REST API - Found {} events", events.size());

        var response = events.stream()
                .map(event -> new EventResponse(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getImageUrl(),
                        event.getDatetime(),
                        event.getDurationMinutes(),
                        event.getLocation(),
                        event.getPrice(),
                        event.getCapacity(),
                        event.getSeatsAvailable()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable String id) {
        log.info("REST API - Received request to get event by id: {}", id);
        
        var event = getEventByIdQuery.execute(
                new GetEventByIdQuery.GetEventByIdRequest(id)
        );

        log.info("REST API - Found event with id: {}", id);
        var response = new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getImageUrl(),
                event.getDatetime(),
                event.getDurationMinutes(),
                event.getLocation(),
                event.getPrice(),
                event.getCapacity(),
                event.getSeatsAvailable()
        );

        return ResponseEntity.ok(response);
    }
}
