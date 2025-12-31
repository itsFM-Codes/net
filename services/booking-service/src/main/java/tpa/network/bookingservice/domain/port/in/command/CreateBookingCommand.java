package tpa.network.bookingservice.domain.port.in.command;

import tpa.network.bookingservice.domain.model.shared.Id;

public interface CreateBookingCommand {
    Id execute(CreateBookingRequest request);

    record CreateBookingRequest(String userId, String eventId, int quantity) { }
}
