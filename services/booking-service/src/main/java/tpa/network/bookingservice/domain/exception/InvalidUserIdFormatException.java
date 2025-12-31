package tpa.network.bookingservice.domain.exception;

public class InvalidUserIdFormatException extends RuntimeException {
    public InvalidUserIdFormatException(String message) {
        super(message);
    }
}
