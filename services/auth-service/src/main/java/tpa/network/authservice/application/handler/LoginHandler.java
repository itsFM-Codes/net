package tpa.network.authservice.application.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.authservice.domain.exception.InvalidCredentialsException;
import tpa.network.authservice.domain.exception.UserNotFoundException;
import tpa.network.authservice.domain.model.shared.Id;
import tpa.network.authservice.domain.port.in.LoginUseCase;
import tpa.network.authservice.domain.port.out.PasswordEncoderPort;
import tpa.network.authservice.domain.port.out.TokenServicePort;
import tpa.network.authservice.domain.port.out.UserServicePort;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginHandler implements LoginUseCase {
    private final UserServicePort userServicePort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenServicePort tokenServicePort;

    @Override
    public LoginResponse execute(LoginRequest request) {
        log.info("Attempting login for email: {}", request.email());

        var userOpt = userServicePort.getUserByEmail(request.email());
        if (userOpt.isEmpty()) {
            log.warn("Login failed - user not found: {}", request.email());
            throw new UserNotFoundException("User not found with email: " + request.email());
        }

        var user = userOpt.get();

        if (!passwordEncoderPort.matches(request.password(), user.passwordHash())) {
            log.warn("Login failed - invalid credentials for email: {}", request.email());
            throw new InvalidCredentialsException();
        }

        var userId = Id.fromString(user.id());
        var accessToken = tokenServicePort.generateAccessToken(userId, user.username(), user.email());
        var refreshToken = tokenServicePort.generateRefreshToken(userId);
        var expiresIn = tokenServicePort.getAccessTokenExpirationTime();

        log.info("Login successful for user: {}", user.id());

        return new LoginResponse(accessToken, refreshToken, expiresIn, userId.getValue());
    }
}
