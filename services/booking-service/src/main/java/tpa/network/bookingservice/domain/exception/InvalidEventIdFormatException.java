package tpa.network.bookingservice.domain.exception;

public class InvalidEventIdFormatException extends RuntimeException {
    public InvalidEventIdFormatException(String message) {
        super(message);
    }
}
