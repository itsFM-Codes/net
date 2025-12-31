package tpa.network.bookingservice.domain.exception;

public class InsufficientSeatsException extends RuntimeException {
    public InsufficientSeatsException(String eventId, int requested) {
        super("Insufficient seats available for event " + eventId + ". Requested: " + requested);
    }
}
