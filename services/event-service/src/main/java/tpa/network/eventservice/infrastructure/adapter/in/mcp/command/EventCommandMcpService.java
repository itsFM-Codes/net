package tpa.network.eventservice.infrastructure.adapter.in.mcp.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventCommandMcpService {

    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;

    @McpTool(description = "Create a new event with title, description, image URL, datetime, duration, location, price, and capacity")
    public String createEvent(String title, String description, String imageUrl, String datetime,
                              int durationMinutes, String location, double price, int capacity) {
        log.info("MCP - Received createEvent request for title: {}", title);
        var request = new CreateEventCommand.CreateEventRequest(
                title, description, imageUrl, datetime,
                durationMinutes, location, price, capacity
        );
        var eventId = createEventCommand.execute(request);
        log.info("MCP - Successfully created event with id: {}", eventId.getValue());
        return eventId.getValue();
    }

    @McpTool(description = "Delete an event by its ID")
    public String deleteEvent(String eventId) {
        log.info("MCP - Received deleteEvent request for id: {}", eventId);
        var request = new DeleteEventCommand.DeleteEventRequest(eventId);
        var deletedId = deleteEventCommand.execute(request);
        log.info("MCP - Successfully deleted event with id: {}", deletedId.getValue());
        return deletedId.getValue();
    }
}
