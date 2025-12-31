package tpa.network.authservice.domain.port.in;

import java.util.Optional;

public interface ValidateTokenUseCase {
    ValidateTokenResponse execute(ValidateTokenRequest request);

    record ValidateTokenRequest(String accessToken) {}
    record ValidateTokenResponse(boolean valid, Optional<UserInfo> user) {}
    record UserInfo(String userId, String username, String email) {}
}
