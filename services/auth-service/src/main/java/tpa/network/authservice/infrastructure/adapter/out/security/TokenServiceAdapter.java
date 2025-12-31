package tpa.network.authservice.infrastructure.adapter.out.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import tpa.network.authservice.domain.exception.InvalidTokenException;
import tpa.network.authservice.domain.model.shared.Id;
import tpa.network.authservice.domain.port.out.TokenServicePort;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class TokenServiceAdapter implements TokenServicePort {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private Long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private Long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public String generateAccessToken(Id userId, String username, String email) {
        log.debug("Generating access token for user: {}", userId.getValue());
        
        var now = new Date();
        var expiryDate = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .subject(userId.getValue())
                .claim("username", username)
                .claim("email", email)
                .claim("type", "access")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    @Override
    public String generateRefreshToken(Id userId) {
        log.debug("Generating refresh token for user: {}", userId.getValue());
        
        var now = new Date();
        var expiryDate = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .subject(userId.getValue())
                .claim("type", "refresh")
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    @Override
    public Id validateAccessToken(String token) {
        try {
            var claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            var type = claims.get("type", String.class);
            if (!"access".equals(type)) {
                throw new InvalidTokenException("Token is not an access token");
            }

            var userId = claims.getSubject();
            log.debug("Access token validated for user: {}", userId);

            return Id.fromString(userId);
        } catch (Exception e) {
            log.warn("Invalid access token: {}", e.getMessage());
            throw new InvalidTokenException("Invalid or expired access token");
        }
    }

    @Override
    public Id validateRefreshToken(String token) {
        try {
            var claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            var type = claims.get("type", String.class);
            if (!"refresh".equals(type)) {
                throw new InvalidTokenException("Token is not a refresh token");
            }

            var userId = claims.getSubject();
            log.debug("Refresh token validated for user: {}", userId);

            return Id.fromString(userId);
        } catch (Exception e) {
            log.warn("Invalid refresh token: {}", e.getMessage());
            throw new InvalidTokenException("Invalid or expired refresh token");
        }
    }

    @Override
    public Long getAccessTokenExpirationTime() {
        return accessTokenExpiration / 1000;
    }
}
