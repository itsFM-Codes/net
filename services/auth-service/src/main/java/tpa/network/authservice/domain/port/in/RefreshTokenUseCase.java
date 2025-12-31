package tpa.network.authservice.domain.port.in;

public interface RefreshTokenUseCase {
    RefreshTokenResponse execute(RefreshTokenRequest request);

    record RefreshTokenRequest(String refreshToken) {}
    record RefreshTokenResponse(String accessToken, String refreshToken, Long expiresIn, String userId) {}
}
