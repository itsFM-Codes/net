package tpa.network.bookingservice.infrastructure.adapter.out.grpc;

import io.grpc.StatusRuntimeException;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;
import tpa.network.bookingservice.domain.port.out.grpc.EventServicePort;
import tpa.network.bookingservice.domain.readmodel.EventReadModel;
import tpa.network.eventservice.EventCommandServiceGrpc;
import tpa.network.eventservice.EventQueryServiceGrpc;
import tpa.network.eventservice.GetEventByIdRequest;
import tpa.network.eventservice.UpdateSeatsRequest;

import java.time.Instant;
import java.util.Optional;

@Component
public class EventServiceGrpcClient implements EventServicePort {
    
    @GrpcClient("event-service")
    private EventQueryServiceGrpc.EventQueryServiceBlockingStub eventQueryStub;
    
    @GrpcClient("event-service")
    private EventCommandServiceGrpc.EventCommandServiceBlockingStub eventCommandStub;

    @Override
    public boolean existsById(String eventId) {
        try {
            GetEventByIdRequest request = GetEventByIdRequest.newBuilder()
                    .setId(eventId)
                    .build();

            var response = eventQueryStub.getEventById(request);
            return response.hasEvent();
        } catch (StatusRuntimeException e) {
            throw new RuntimeException("Event not found: " + e.getMessage(), e);
        }
    }

    @Override
    public Optional<EventReadModel> getEventById(String eventId) {
        try {
            GetEventByIdRequest request = GetEventByIdRequest.newBuilder()
                    .setId(eventId)
                    .build();

            var response = eventQueryStub.getEventById(request);
            if (response.hasEvent()) {
                var event = response.getEvent();
                return Optional.of(new EventReadModel(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getImageUrl(),
                        Instant.ofEpochSecond(event.getDatetime().getSeconds(), event.getDatetime().getNanos()),
                        event.getDurationMinutes(),
                        event.getLocation(),
                        event.getPrice(),
                        event.getCapacity(),
                        event.getSeatsAvailable()
                ));
            }
            return Optional.empty();
        } catch (StatusRuntimeException e) {
            return Optional.empty();
        }
    }

    @Override
    public UpdateSeatsResult updateSeats(String eventId, int quantity) {
        try {
            UpdateSeatsRequest request = UpdateSeatsRequest.newBuilder()
                    .setEventId(eventId)
                    .setQuantity(quantity)
                    .build();

            var response = eventCommandStub.updateSeats(request);
            return new UpdateSeatsResult(
                    response.getSuccess(),
                    response.getSeatsAvailable(),
                    response.getErrorMessage()
            );
        } catch (StatusRuntimeException e) {
            return new UpdateSeatsResult(false, 0, "gRPC error: " + e.getMessage());
        }
    }
}
