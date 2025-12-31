package tpa.network.eventservice.domain.exception;

public class InvalidCapacityException extends RuntimeException {
    public InvalidCapacityException() {
        super("Capacity must be greater than 0!");
    }
}
