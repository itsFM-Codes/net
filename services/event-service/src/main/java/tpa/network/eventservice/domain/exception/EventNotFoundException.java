package tpa.network.eventservice.domain.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException() {
        super("Event not found!");
    }
}
