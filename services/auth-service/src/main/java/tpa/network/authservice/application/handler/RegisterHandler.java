package tpa.network.authservice.application.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.authservice.domain.exception.UserAlreadyExistsException;
import tpa.network.authservice.domain.port.in.RegisterUseCase;
import tpa.network.authservice.domain.port.out.PasswordEncoderPort;
import tpa.network.authservice.domain.port.out.UserServicePort;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterHandler implements RegisterUseCase {
    private final UserServicePort userServicePort;
    private final PasswordEncoderPort passwordEncoderPort;

    @Override
    public RegisterResponse execute(RegisterRequest request) {
        log.info("Attempting registration for email: {}", request.email());

        var existingUser = userServicePort.getUserByEmail(request.email());
        if (existingUser.isPresent()) {
            log.warn("Registration failed - user already exists: {}", request.email());
            throw new UserAlreadyExistsException("User already exists with email: " + request.email());
        }

        var passwordHash = passwordEncoderPort.encode(request.password());
        var userId = userServicePort.createUser(request.username(), request.email(), passwordHash);

        log.info("Registration successful for user: {}", userId);
        return new RegisterResponse(userId);
    }
}
