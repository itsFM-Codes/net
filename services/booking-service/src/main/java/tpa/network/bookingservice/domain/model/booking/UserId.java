package tpa.network.bookingservice.domain.model.booking;

import lombok.Value;
import tpa.network.bookingservice.domain.exception.InvalidUserIdFormatException;

@Value
public class UserId {
    String value;

    public static UserId fromString(String value) {
        validate(value);
        return new UserId(value);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new InvalidUserIdFormatException("User ID cannot be null or empty!");
        }
    }
}
