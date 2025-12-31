package tpa.network.authservice.application.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.authservice.domain.exception.InvalidTokenException;
import tpa.network.authservice.domain.exception.UserNotFoundException;
import tpa.network.authservice.domain.model.shared.Id;
import tpa.network.authservice.domain.port.in.RefreshTokenUseCase;
import tpa.network.authservice.domain.port.out.TokenServicePort;
import tpa.network.authservice.domain.port.out.UserServicePort;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenHandler implements RefreshTokenUseCase {
    private final TokenServicePort tokenServicePort;
    private final UserServicePort userServicePort;

    @Override
    public RefreshTokenResponse execute(RefreshTokenRequest request) {
        log.info("Attempting to refresh token");

        try {
            var userId = tokenServicePort.validateRefreshToken(request.refreshToken());
            log.debug("Refresh token validated for user: {}", userId.getValue());

            var userOpt = userServicePort.getUserById(userId.getValue());
            if (userOpt.isEmpty()) {
                log.warn("User not found with id: {}", userId.getValue());
                throw new UserNotFoundException("User not found with id: " + userId.getValue());
            }

            var user = userOpt.get();

            var newAccessToken = tokenServicePort.generateAccessToken(userId, user.username(), user.email());
            var newRefreshToken = tokenServicePort.generateRefreshToken(userId);
            var expiresIn = tokenServicePort.getAccessTokenExpirationTime();

            log.info("Token refresh successful for user: {}", userId.getValue());

            return new RefreshTokenResponse(newAccessToken, newRefreshToken, expiresIn, userId.getValue());
        } catch (Exception e) {
            log.error("Token refresh failed: {}", e.getMessage());
            throw new InvalidTokenException("Failed to refresh token: " + e.getMessage());
        }
    }
}
