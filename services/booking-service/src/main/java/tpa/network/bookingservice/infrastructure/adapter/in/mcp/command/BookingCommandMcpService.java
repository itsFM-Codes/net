package tpa.network.bookingservice.infrastructure.adapter.in.mcp.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.command.CreateBookingCommand;
import tpa.network.bookingservice.domain.port.in.command.DeleteBookingCommand;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingCommandMcpService {

    private final CreateBookingCommand createBookingCommand;
    private final DeleteBookingCommand deleteBookingCommand;

    @McpTool(description = "Create a new booking for a user to attend an event with a specified quantity")
    public String createBooking(String userId, String eventId, int quantity) {
        log.info("MCP - Received createBooking request for userId: {}, eventId: {}", userId, eventId);
        var request = new CreateBookingCommand.CreateBookingRequest(userId, eventId, quantity);
        var bookingId = createBookingCommand.execute(request);
        log.info("MCP - Successfully created booking with id: {}", bookingId.getValue());
        return bookingId.getValue();
    }

    @McpTool(description = "Delete a booking by its ID")
    public String deleteBooking(String bookingId) {
        log.info("MCP - Received deleteBooking request for id: {}", bookingId);
        var request = new DeleteBookingCommand.DeleteBookingRequest(bookingId);
        var deletedId = deleteBookingCommand.execute(request);
        log.info("MCP - Successfully deleted booking with id: {}", deletedId.getValue());
        return deletedId.getValue();
    }
}
