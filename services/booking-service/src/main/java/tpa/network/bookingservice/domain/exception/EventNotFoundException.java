package tpa.network.bookingservice.domain.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(String eventId) {
        super("Event with id " + eventId + " not found");
    }
}
