package tpa.network.authservice.domain.port.out;

import tpa.network.authservice.domain.model.shared.Id;

public interface TokenServicePort {
    String generateAccessToken(Id userId, String username, String email);
    String generateRefreshToken(Id userId);
    Id validateAccessToken(String token);
    Id validateRefreshToken(String token);
    Long getAccessTokenExpirationTime();
}
