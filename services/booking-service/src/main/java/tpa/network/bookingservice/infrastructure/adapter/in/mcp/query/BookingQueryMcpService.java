package tpa.network.bookingservice.infrastructure.adapter.in.mcp.query;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingQueryMcpService {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;

    @McpTool(description = "Retrieve all bookings in the system")
    public List<BookingReadModel> getAllBookings() {
        log.info("MCP - Received getAllBookings request");
        var bookings = getAllBookingsQuery.execute();
        log.info("MCP - Found {} bookings", bookings.size());
        return bookings;
    }

    @McpTool(description = "Retrieve a specific booking by its ID")
    public BookingReadModel getBookingById(String bookingId) {
        log.info("MCP - Received getBookingById request for id: {}", bookingId);
        return getBookingByIdQuery.execute(bookingId)
                .map(booking -> {
                    log.info("MCP - Found booking with id: {}", bookingId);
                    return booking;
                })
                .orElseThrow(() -> {
                    log.warn("MCP - Booking not found with id: {}", bookingId);
                    return new BookingNotFoundException();
                });
    }
}
