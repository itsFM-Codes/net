package tpa.network.authservice.infrastructure.adapter.out.grpc;

import io.grpc.StatusRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;
import tpa.network.authservice.domain.port.out.UserServicePort;
import tpa.network.userservice.*;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserServiceGrpcAdapter implements UserServicePort {

    @GrpcClient("user-service")
    private UserQueryServiceGrpc.UserQueryServiceBlockingStub userQueryStub;

    @GrpcClient("user-service")
    private UserCommandServiceGrpc.UserCommandServiceBlockingStub userCommandStub;

    @Override
    public Optional<UserDto> getUserByEmail(String email) {
        log.debug("Calling user-service via gRPC to get user by email: {}", email);
        
        try {
            var request = GetUserByEmailRequest.newBuilder()
                    .setEmail(email)
                    .build();

            var response = userQueryStub.getUserByEmail(request);

            if (!response.hasUser()) {
                log.debug("User not found with email: {}", email);
                return Optional.empty();
            }

            var user = response.getUser();
            log.debug("User found with email: {}", email);
            
            return Optional.of(new UserDto(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPasswordHash()
            ));
        } catch (StatusRuntimeException e) {
            log.error("gRPC error while fetching user by email: {}", e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<UserDto> getUserById(String userId) {
        log.debug("Calling user-service via gRPC to get user by id: {}", userId);
        
        try {
            var request = GetUserByIdRequest.newBuilder()
                    .setId(userId)
                    .build();

            var response = userQueryStub.getUserById(request);

            if (!response.hasUser()) {
                log.debug("User not found with id: {}", userId);
                return Optional.empty();
            }

            var user = response.getUser();
            log.debug("User found with id: {}", userId);
            
            return Optional.of(new UserDto(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPasswordHash()
            ));
        } catch (StatusRuntimeException e) {
            log.error("gRPC error while fetching user by id: {}", e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public String createUser(String username, String email, String passwordHash) {
        log.debug("Calling user-service via gRPC to create user with email: {}", email);
        
        try {
            var request = CreateUserRequest.newBuilder()
                    .setUsername(username)
                    .setEmail(email)
                    .setPassword(passwordHash)
                    .build();

            var response = userCommandStub.createUser(request);
            
            log.info("User created successfully with id: {}", response.getId());
            return response.getId();
        } catch (StatusRuntimeException e) {
            log.error("gRPC error while creating user: {}", e.getMessage());
            throw new RuntimeException("Failed to create user: " + e.getMessage(), e);
        }
    }
}
