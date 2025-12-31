package tpa.network.eventservice.domain.port.in.command;

import tpa.network.eventservice.domain.model.shared.Id;

public interface DeleteEventCommand {
    Id execute(DeleteEventRequest request);

    record DeleteEventRequest(String eventId) { }
}
