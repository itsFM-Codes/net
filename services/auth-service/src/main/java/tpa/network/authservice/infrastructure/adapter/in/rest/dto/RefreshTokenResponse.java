package tpa.network.authservice.infrastructure.adapter.in.rest.dto;

public record RefreshTokenResponse(String accessToken, String refreshToken, Long expiresIn) {
}
