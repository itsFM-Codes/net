package tpa.network.authservice.infrastructure.adapter.in.rest.dto;

public record LoginResponse(String accessToken, String refreshToken, Long expiresIn, String userId) {
}
