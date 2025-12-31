package tpa.network.authservice.domain.port.out;

import java.util.Optional;

public interface UserServicePort {
    Optional<UserDto> getUserByEmail(String email);
    Optional<UserDto> getUserById(String userId);
    String createUser(String username, String email, String passwordHash);
    
    record UserDto(String id, String username, String email, String passwordHash) {}
}
