package tpa.network.bookingservice.infrastructure.adapter.out.grpc;

import io.grpc.StatusRuntimeException;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;
import tpa.network.bookingservice.domain.port.out.grpc.UserServicePort;
import tpa.network.userservice.GetUserByIdRequest;
import tpa.network.userservice.UserQueryServiceGrpc;

@Component
public class UserServiceGrpcClient implements UserServicePort {
    
    @GrpcClient("user-service")
    private UserQueryServiceGrpc.UserQueryServiceBlockingStub userQueryStub;

    @Override
    public boolean existsById(String userId) {
        try {
            GetUserByIdRequest request = GetUserByIdRequest.newBuilder()
                    .setId(userId)
                    .build();
            
            var response = userQueryStub.getUserById(request);
            return response.hasUser();
        } catch (StatusRuntimeException e) {
            throw new RuntimeException("User not found: " + e.getMessage(), e);
        }
    }
}
