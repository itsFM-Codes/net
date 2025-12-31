package tpa.network.userservice.infrastructure.adapter.in.grpc.query;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.userservice.*;
import tpa.network.userservice.domain.port.in.query.GetAllUsersQuery;
import tpa.network.userservice.domain.port.in.query.GetUserByEmailQuery;
import tpa.network.userservice.domain.port.in.query.GetUserByIdQuery;
import tpa.network.userservice.infrastructure.adapter.in.grpc.mapper.UserGrpcMapper;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class UserQueryGrpcService extends UserQueryServiceGrpc.UserQueryServiceImplBase {

    private final GetAllUsersQuery getAllUsersQuery;
    private final GetUserByIdQuery getUserByIdQuery;
    private final GetUserByEmailQuery getUserByEmailQuery;

    private final UserGrpcMapper userGrpcMapper;

    @Override
    public void getAllUsers(GetAllUsersRequest request, StreamObserver<GetAllUsersResponse> responseObserver) {
        log.info("gRPC - Received getAllUsers request");
        
        var users = getAllUsersQuery.execute();
        log.info("gRPC - Found {} users", users.size());

        var response = GetAllUsersResponse.newBuilder()
                .addAllUsers(users.stream().map(userGrpcMapper::toProto).toList())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getUserById(GetUserByIdRequest request, StreamObserver<GetUserByIdResponse> responseObserver) {
        log.info("gRPC - Received getUserById request for id: {}", request.getId());
        
        var user = getUserByIdQuery.execute(request.getId());

        var responseBuilder = GetUserByIdResponse.newBuilder();
        user.map(userGrpcMapper::toProto).ifPresentOrElse(
                u -> {
                    log.info("gRPC - Found user with id: {}", request.getId());
                    responseBuilder.setUser(u);
                },
                () -> log.warn("gRPC - User not found with id: {}", request.getId())
        );

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    @Override
    public void getUserByEmail(GetUserByEmailRequest request, StreamObserver<GetUserByEmailResponse> responseObserver) {
        log.info("gRPC - Received getUserByEmail request for email: {}", request.getEmail());
        
        var user = getUserByEmailQuery.execute(
                GetUserByEmailQuery.GetUserByEmailRequest.builder()
                        .email(request.getEmail())
                        .build()
        );

        var responseBuilder = GetUserByEmailResponse.newBuilder();
        user.map(userGrpcMapper::toProto).ifPresentOrElse(
                u -> {
                    log.info("gRPC - Found user with email: {}", request.getEmail());
                    responseBuilder.setUser(u);
                },
                () -> log.warn("gRPC - User not found with email: {}", request.getEmail())
        );

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
