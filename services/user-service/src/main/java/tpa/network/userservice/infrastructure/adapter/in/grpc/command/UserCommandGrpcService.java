package tpa.network.userservice.infrastructure.adapter.in.grpc.command;

import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import tpa.network.userservice.*;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class UserCommandGrpcService extends UserCommandServiceGrpc.UserCommandServiceImplBase {

    private final CreateUserCommand createUserCommand;

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<CreateUserResponse> responseObserver) {
        log.info("gRPC - Received createUser request for username: {}, email: {}", 
                request.getUsername(), request.getEmail());
        
        var dto = new CreateUserCommand.CreateUserRequest(
                request.getUsername(), request.getEmail(),  request.getPassword()
        );

        var id = createUserCommand.execute(dto);

        log.info("gRPC - Successfully created user with id: {}", id.getValue());
        var response = CreateUserResponse.newBuilder()
                .setId(id.getValue())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
