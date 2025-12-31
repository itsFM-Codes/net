package tpa.network.bookingservice.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.bookingservice.*;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.in.query.GetBookingByIdQuery;
import tpa.network.bookingservice.infrastructure.adapter.in.grpc.mapper.BookingGrpcMapper;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class BookingQueryGrpcService extends BookingQueryServiceGrpc.BookingQueryServiceImplBase {

    private final GetAllBookingsQuery getAllBookingsQuery;
    private final GetBookingByIdQuery getBookingByIdQuery;

    private final BookingGrpcMapper bookingGrpcMapper;

    @Override
    public void getAllBookings(GetAllBookingsRequest request, StreamObserver<GetAllBookingsResponse> responseObserver) {
        log.info("gRPC - Received getAllBookings request");
        var bookings = getAllBookingsQuery.execute();

        var response = GetAllBookingsResponse.newBuilder()
                .addAllBookings(bookings.stream().map(bookingGrpcMapper::toProto).toList())
                .build();

        log.info("gRPC - Found {} bookings", bookings.size());
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getBookingById(GetBookingByIdRequest request, StreamObserver<GetBookingByIdResponse> responseObserver) {
        log.info("gRPC - Received getBookingById request for id: {}", request.getId());
        var booking = getBookingByIdQuery.execute(request.getId());

        var responseBuilder = GetBookingByIdResponse.newBuilder();
        booking.map(bookingGrpcMapper::toProto).ifPresentOrElse(
                b -> {
                    log.info("gRPC - Found booking with id: {}", request.getId());
                    responseBuilder.setBooking(b);
                },
                () -> log.warn("gRPC - Booking not found with id: {}", request.getId())
        );

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
