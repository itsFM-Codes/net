package tpa.network.userservice.infrastructure.adapter.in.grpc.interceptor;

import io.grpc.Status;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;
import tpa.network.userservice.domain.exception.*;

@GrpcAdvice
public class GlobalGrpcExceptionHandler {

    @GrpcExceptionHandler(UserNotFoundException.class)
    public Status handleUserNotFoundException(UserNotFoundException e) {
        return Status.NOT_FOUND.withDescription(e.getMessage()).withCause(e);
    }

    @GrpcExceptionHandler(EmailTakenException.class)
    public Status handleEmailTaken(EmailTakenException ex) {
        return Status.ALREADY_EXISTS.withDescription(ex.getMessage()).withCause(ex);
    }

    @GrpcExceptionHandler({
            InvalidUsernameFormatException.class,
            InvalidEmailFormatException.class,
            InvalidPasswordFormatException.class
    })
    public Status handleValidationErrors(Exception ex) {
        return Status.INVALID_ARGUMENT.withDescription(ex.getMessage()).withCause(ex);
    }

    @GrpcExceptionHandler(IllegalArgumentException.class)
    public Status handleIllegalArgument(IllegalArgumentException ex) {
        return Status.INVALID_ARGUMENT.withDescription(ex.getMessage()).withCause(ex);
    }

    @GrpcExceptionHandler(Exception.class)
    public Status handleGenericException(Exception ex) {
        return Status.INTERNAL.withDescription("Internal server error").withCause(ex);
    }
}