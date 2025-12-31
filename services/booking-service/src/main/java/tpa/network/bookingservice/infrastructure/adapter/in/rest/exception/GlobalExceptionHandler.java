package tpa.network.bookingservice.infrastructure.adapter.in.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.domain.exception.EventAlreadyPassedException;
import tpa.network.bookingservice.domain.exception.EventNotFoundException;
import tpa.network.bookingservice.domain.exception.InsufficientSeatsException;
import tpa.network.bookingservice.domain.exception.InvalidEventIdFormatException;
import tpa.network.bookingservice.domain.exception.InvalidQuantityException;
import tpa.network.bookingservice.domain.exception.InvalidUserIdFormatException;
import tpa.network.bookingservice.domain.exception.UserNotFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            BookingNotFoundException.class,
            UserNotFoundException.class,
            EventNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleNotFoundExceptions(RuntimeException e) {
        log.error("Not found exception: {}", e.getMessage());
        var error = ErrorResponse.of(e.getMessage(), HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler({
            InvalidUserIdFormatException.class,
            InvalidEventIdFormatException.class,
            InvalidQuantityException.class
    })
    public ResponseEntity<ErrorResponse> handleValidationExceptions(RuntimeException e) {
        log.error("Validation exception: {}", e.getMessage());
        var error = ErrorResponse.of(e.getMessage(), HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(InsufficientSeatsException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientSeatsException(InsufficientSeatsException e) {
        log.error("Insufficient seats exception: {}", e.getMessage());
        var error = ErrorResponse.of(e.getMessage(), HttpStatus.CONFLICT.value());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(EventAlreadyPassedException.class)
    public ResponseEntity<ErrorResponse> handleEventAlreadyPassedException(EventAlreadyPassedException e) {
        log.error("Event already passed exception: {}", e.getMessage());
        var error = ErrorResponse.of(e.getMessage(), HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
        log.error("Internal server error: {}", e.getMessage(), e);
        var error = ErrorResponse.of("An internal error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
