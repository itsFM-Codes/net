package tpa.network.authservice.infrastructure.adapter.in.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.authservice.domain.port.in.LoginUseCase;
import tpa.network.authservice.domain.port.in.RefreshTokenUseCase;
import tpa.network.authservice.domain.port.in.RegisterUseCase;
import tpa.network.authservice.domain.port.in.ValidateTokenUseCase;
import tpa.network.authservice.infrastructure.adapter.in.rest.dto.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RegisterUseCase registerUseCase;
    private final LoginUseCase loginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final ValidateTokenUseCase validateTokenUseCase;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        log.info("REST - Received register request for email: {}", request.email());

        var useCaseRequest = new RegisterUseCase.RegisterRequest(
                request.username(),
                request.email(),
                request.password()
        );
        var result = registerUseCase.execute(useCaseRequest);

        log.info("REST - Registration successful for user: {}", result.userId());

        var response = new RegisterResponse(result.userId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        log.info("REST - Received login request for email: {}", request.email());

        var useCaseRequest = new LoginUseCase.LoginRequest(request.email(), request.password());
        var result = loginUseCase.execute(useCaseRequest);

        log.info("REST - Login successful for user: {}", result.userId());

        var response = new LoginResponse(
                result.accessToken(),
                result.refreshToken(),
                result.expiresIn(),
                result.userId()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        log.info("REST - Received refresh token request");

        var useCaseRequest = new RefreshTokenUseCase.RefreshTokenRequest(request.refreshToken());
        var result = refreshTokenUseCase.execute(useCaseRequest);

        log.info("REST - Token refresh successful for user: {}", result.userId());

        var response = new RefreshTokenResponse(
                result.accessToken(),
                result.refreshToken(),
                result.expiresIn()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateTokenResponse> validateToken(@RequestBody ValidateTokenRequest request) {
        log.debug("REST - Received validate token request");

        var useCaseRequest = new ValidateTokenUseCase.ValidateTokenRequest(request.accessToken());
        var result = validateTokenUseCase.execute(useCaseRequest);

        log.debug("REST - Token validation result: {}", result.valid());

        var response = new ValidateTokenResponse(
                result.valid(),
                result.user().map(u -> new UserInfo(u.userId(), u.username(), u.email())).orElse(null)
        );

        return ResponseEntity.ok(response);
    }
}
