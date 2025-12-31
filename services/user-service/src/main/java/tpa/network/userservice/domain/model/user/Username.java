package tpa.network.userservice.domain.model.user;

import lombok.Value;
import tpa.network.userservice.domain.exception.InvalidUsernameFormatException;

@Value
public class Username {
    String value;

    public static Username fromString(String value) {
        validate(value);
        return new Username(value);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new InvalidUsernameFormatException("Username cannot be null or empty!");
        }
    }
}
