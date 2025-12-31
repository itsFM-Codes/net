package tpa.network.eventservice.domain.port.in.command;

public interface UpdateSeatsCommand {
    UpdateSeatsResponse execute(UpdateSeatsRequest request);

    record UpdateSeatsRequest(
            String eventId,
            int quantity
    ) { }

    record UpdateSeatsResponse(
            boolean success,
            int seatsAvailable,
            String errorMessage
    ) { }
}
