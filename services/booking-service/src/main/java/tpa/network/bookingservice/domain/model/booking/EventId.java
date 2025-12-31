package tpa.network.bookingservice.domain.model.booking;

import lombok.Value;
import tpa.network.bookingservice.domain.exception.InvalidEventIdFormatException;

@Value
public class EventId {
    String value;

    public static EventId fromString(String value) {
        validate(value);
        return new EventId(value);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new InvalidEventIdFormatException("Event ID cannot be null or empty!");
        }
    }
}
