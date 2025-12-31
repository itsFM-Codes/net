package tpa.network.userservice.domain.exception;

public class EmailTakenException extends RuntimeException {
    public EmailTakenException() {
        super("Email is already taken");
    }
}
