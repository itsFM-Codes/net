package tpa.network.authservice.domain.port.in;

public interface LoginUseCase {
    LoginResponse execute(LoginRequest request);

    record LoginRequest(String email, String password) {}
    record LoginResponse(String accessToken, String refreshToken, Long expiresIn, String userId) {}
}
