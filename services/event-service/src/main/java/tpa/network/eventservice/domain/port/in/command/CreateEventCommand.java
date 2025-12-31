package tpa.network.eventservice.domain.port.in.command;

import tpa.network.eventservice.domain.model.shared.Id;

public interface CreateEventCommand {
    Id execute(CreateEventRequest request);

    record CreateEventRequest(
            String title,
            String description,
            String imageUrl,
            String datetime,
            int durationMinutes,
            String location,
            double price,
            int capacity
    ) { }
}
