package tpa.network.eventservice.infrastructure.adapter.in.rest.command;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;
import tpa.network.eventservice.infrastructure.adapter.in.rest.command.dto.*;

@Slf4j
@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventCommandController {
    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;

    @PostMapping
    public ResponseEntity<CreateEventResponse> createEvent(
            @RequestBody @Valid CreateEventRequest createEventRequest
    ) {
        log.info("REST API - Received request to create event with title: {}, datetime: {}", 
                createEventRequest.title(), createEventRequest.datetime());
        
        var id = createEventCommand.execute(
                new CreateEventCommand.CreateEventRequest(
                        createEventRequest.title(),
                        createEventRequest.description(),
                        createEventRequest.imageUrl(),
                        createEventRequest.datetime(),
                        createEventRequest.durationMinutes(),
                        createEventRequest.location(),
                        createEventRequest.price(),
                        createEventRequest.capacity()
                )
        );

        log.info("REST API - Successfully created event with id: {}", id.getValue());
        var response = new CreateEventResponse(id.getValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteEventResponse> deleteEvent(
            @PathVariable String id
    ) {
        log.info("REST API - Received request to delete event with id: {}", id);
        
        var deletedId = deleteEventCommand.execute(
                new DeleteEventCommand.DeleteEventRequest(id)
        );

        log.info("REST API - Successfully deleted event with id: {}", deletedId.getValue());
        var response = new DeleteEventResponse(deletedId.getValue());
        return ResponseEntity.ok(response);
    }
}
