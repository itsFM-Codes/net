package tpa.network.eventservice.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.eventservice.*;
import tpa.network.eventservice.domain.port.in.query.GetAllEventsQuery;
import tpa.network.eventservice.domain.port.in.query.GetEventByIdQuery;
import tpa.network.eventservice.infrastructure.adapter.in.grpc.mapper.EventGrpcMapper;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class EventQueryGrpcService extends EventQueryServiceGrpc.EventQueryServiceImplBase {

    private final GetAllEventsQuery getAllEventsQuery;
    private final GetEventByIdQuery getEventByIdQuery;

    private final EventGrpcMapper eventGrpcMapper;

    @Override
    public void getAllEvents(GetAllEventsRequest request, StreamObserver<GetAllEventsResponse> responseObserver) {
        log.info("gRPC - Received getAllEvents request");
        
        var events = getAllEventsQuery.execute();
        log.info("gRPC - Found {} events", events.size());

        var response = GetAllEventsResponse.newBuilder()
                .addAllEvents(events.stream().map(eventGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getEventById(GetEventByIdRequest request, StreamObserver<GetEventByIdResponse> responseObserver) {
        log.info("gRPC - Received getEventById request for id: {}", request.getId());
        
        var dto = new GetEventByIdQuery.GetEventByIdRequest(request.getId());
        var event = getEventByIdQuery.execute(dto);

        var responseBuilder = GetEventByIdResponse.newBuilder();
        if (event != null) {
            log.info("gRPC - Found event with id: {}", request.getId());
            responseBuilder.setEvent(eventGrpcMapper.toProto(event));
        } else {
            log.warn("gRPC - Event not found with id: {}", request.getId());
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
