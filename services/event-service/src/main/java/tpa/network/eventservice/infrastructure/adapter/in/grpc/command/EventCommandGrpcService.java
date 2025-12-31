package tpa.network.eventservice.infrastructure.adapter.in.grpc.command;

import com.google.protobuf.Timestamp;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.eventservice.*;
import tpa.network.eventservice.domain.port.in.command.CreateEventCommand;
import tpa.network.eventservice.domain.port.in.command.DeleteEventCommand;
import tpa.network.eventservice.domain.port.in.command.UpdateSeatsCommand;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class EventCommandGrpcService extends EventCommandServiceGrpc.EventCommandServiceImplBase {

    private final CreateEventCommand createEventCommand;
    private final DeleteEventCommand deleteEventCommand;
    private final UpdateSeatsCommand updateSeatsCommand;

    @Override
    public void createEvent(CreateEventRequest request, StreamObserver<CreateEventResponse> responseObserver) {
        log.info("gRPC - Received createEvent request for title: {}", request.getTitle());
        
        Timestamp timestamp = request.getDatetime();
        LocalDateTime datetime = LocalDateTime.ofInstant(
                Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos()),
                ZoneOffset.UTC
        );

        var dto = new CreateEventCommand.CreateEventRequest(
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                datetime.toString(),
                request.getDurationMinutes(),
                request.getLocation(),
                request.getPrice(),
                request.getCapacity()
        );

        var id = createEventCommand.execute(dto);

        log.info("gRPC - Successfully created event with id: {}", id.getValue());
        var response = CreateEventResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteEvent(DeleteEventRequest request, StreamObserver<DeleteEventResponse> responseObserver) {
        log.info("gRPC - Received deleteEvent request for id: {}", request.getId());
        
        var dto = new DeleteEventCommand.DeleteEventRequest(
                request.getId()
        );

        var id = deleteEventCommand.execute(dto);

        log.info("gRPC - Successfully deleted event with id: {}", id.getValue());
        var response = DeleteEventResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateSeats(UpdateSeatsRequest request, StreamObserver<UpdateSeatsResponse> responseObserver) {
        log.info("gRPC - Received updateSeats request for eventId: {}, quantity: {}", 
                request.getEventId(), request.getQuantity());
        
        var dto = new UpdateSeatsCommand.UpdateSeatsRequest(
                request.getEventId(),
                request.getQuantity()
        );

        var result = updateSeatsCommand.execute(dto);

        log.info("gRPC - UpdateSeats result: success={}, seatsAvailable={}", 
                result.success(), result.seatsAvailable());
        
        var response = UpdateSeatsResponse.newBuilder()
                .setSuccess(result.success())
                .setSeatsAvailable(result.seatsAvailable())
                .setErrorMessage(result.errorMessage() != null ? result.errorMessage() : "")
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
