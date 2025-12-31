package tpa.network.bookingservice.infrastructure.adapter.in.grpc.interceptor;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;
import tpa.network.bookingservice.domain.exception.BookingNotFoundException;
import tpa.network.bookingservice.domain.exception.InvalidEventIdFormatException;
import tpa.network.bookingservice.domain.exception.InvalidQuantityException;
import tpa.network.bookingservice.domain.exception.InvalidUserIdFormatException;

@GrpcAdvice
public class GlobalGrpcExceptionHandler {

    @GrpcExceptionHandler(BookingNotFoundException.class)
    public Status handleBookingNotFoundException(BookingNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler({
            InvalidUserIdFormatException.class,
            InvalidEventIdFormatException.class,
            InvalidQuantityException.class
    })
    public Status handleValidationExceptions(RuntimeException e) {
        return Status.INVALID_ARGUMENT.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(Exception.class)
    public Status handleGenericException(Exception e) {
        return Status.INTERNAL.withDescription("An internal error occurred").withCause(e);
    }
}
