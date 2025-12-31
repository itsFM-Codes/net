package tpa.network.eventservice.domain.exception;

public class InvalidPriceException extends RuntimeException {
    public InvalidPriceException() {
        super("Price cannot be negative!");
    }
}
