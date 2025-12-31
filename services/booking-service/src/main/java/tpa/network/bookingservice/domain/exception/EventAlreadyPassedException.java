package tpa.network.bookingservice.domain.exception;

public class EventAlreadyPassedException extends RuntimeException {
    public EventAlreadyPassedException(String eventId) {
        super("Cannot book event " + eventId + " because it has already passed");
    }
}
