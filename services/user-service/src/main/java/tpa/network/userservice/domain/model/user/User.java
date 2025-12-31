package tpa.network.userservice.domain.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpa.network.userservice.domain.model.shared.Id;

@Data
@AllArgsConstructor
public class User {

    @org.springframework.data.annotation.Id
    private Id id;

    private Username username;
    private Email email;
    private Password password;

    public static User create(String username, String email, String password) {
        return new User(
                Id.generate(),
                Username.fromString(username),
                Email.fromString(email),
                Password.fromString(password)
        );
    }
}