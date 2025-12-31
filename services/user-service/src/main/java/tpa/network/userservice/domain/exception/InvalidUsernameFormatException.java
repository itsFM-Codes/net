package tpa.network.userservice.domain.exception;

public class InvalidUsernameFormatException extends RuntimeException {
    public InvalidUsernameFormatException(String message) {
        super(message);
    }
}
