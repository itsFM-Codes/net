package tpa.network.authservice.domain.port.in;

public interface RegisterUseCase {
    RegisterResponse execute(RegisterRequest request);
    
    record RegisterRequest(String username, String email, String password) {}
    record RegisterResponse(String userId) {}
}
