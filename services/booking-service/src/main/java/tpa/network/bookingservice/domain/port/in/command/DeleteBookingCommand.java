package tpa.network.bookingservice.domain.port.in.command;

import tpa.network.bookingservice.domain.model.shared.Id;

public interface DeleteBookingCommand {
    Id execute(DeleteBookingRequest request);

    record DeleteBookingRequest(String id) { }
}
