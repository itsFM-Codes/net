package tpa.network.eventservice.infrastructure.adapter.in.mcp.query;

import java.util.List;

import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tpa.network.eventservice.domain.port.in.query.GetAllEventsQuery;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.domain.port.in.query.SearchEventByTitleQuery;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventQueryMcpService {

    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;
    private final SearchEventByTitleQuery searchEventByTitleQuery;

    @McpTool(description = "Retrieve all events in the system")
    public List<EventReadModel> getAllEvents() {
        log.info("MCP - Received getAllEvents request");
        var events = getAllEventsQuery.execute();
        log.info("MCP - Found {} events", events.size());
        return events;
    }

    @McpTool(description = "Retrieve a specific event by its ID")
    public EventReadModel getEventById(String eventId) {
        log.info("MCP - Received getEventById request for id: {}", eventId);
        var event = getEventByIdQuery.execute(new GetEventByIdQuery.GetEventByIdRequest(eventId));
        log.info("MCP - Found event with id: {}", eventId);
        return event;
    }

    @McpTool(description = "Search for an event by title with fuzzy matching. Use this when a user mentions an event by name - it handles typos and partial matches. Returns the best matching event along with a similarity score (0-1) and alternative suggestions. If similarityScore is above 0.7, the match is likely correct. Always use this tool first when a user wants to book or inquire about a specific event by name.")
    public SearchEventByTitleQuery.SearchEventByTitleResponse searchEventByTitle(String title) {
        log.info("MCP - Received searchEventByTitle request for title: {}", title);
        var result = searchEventByTitleQuery.execute(new SearchEventByTitleQuery.SearchEventByTitleRequest(title));
        if (result.bestMatch() != null) {
            log.info("MCP - Best match: '{}' with score: {}", result.bestMatch().getTitle(), result.similarityScore());
        } else {
            log.info("MCP - No events found");
        }
        return result;
    }
}
