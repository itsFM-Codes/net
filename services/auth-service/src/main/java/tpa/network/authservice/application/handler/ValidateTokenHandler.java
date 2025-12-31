package tpa.network.authservice.application.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.authservice.domain.exception.InvalidTokenException;
import tpa.network.authservice.domain.model.shared.Id;
import tpa.network.authservice.domain.port.in.ValidateTokenUseCase;
import tpa.network.authservice.domain.port.out.TokenServicePort;
import tpa.network.authservice.domain.port.out.UserServicePort;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidateTokenHandler implements ValidateTokenUseCase {
    private final TokenServicePort tokenServicePort;
    private final UserServicePort userServicePort;

    @Override
    public ValidateTokenResponse execute(ValidateTokenRequest request) {
        log.debug("Validating access token");

        try {
            var userId = tokenServicePort.validateAccessToken(request.accessToken());
            log.debug("Token validated for user: {}", userId.getValue());

            var userOpt = userServicePort.getUserById(userId.getValue());
            if (userOpt.isEmpty()) {
                log.warn("Token valid but user not found: {}", userId.getValue());
                return new ValidateTokenResponse(false, Optional.empty());
            }

            var user = userOpt.get();
            var userInfo = new UserInfo(user.id(), user.username(), user.email());

            log.debug("Token validation successful for user: {}", userId.getValue());
            return new ValidateTokenResponse(true, Optional.of(userInfo));

        } catch (InvalidTokenException e) {
            log.debug("Token validation failed: {}", e.getMessage());
            return new ValidateTokenResponse(false, Optional.empty());
        } catch (Exception e) {
            log.error("Unexpected error during token validation: {}", e.getMessage());
            return new ValidateTokenResponse(false, Optional.empty());
        }
    }
}
