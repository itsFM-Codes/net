package tpa.network.eventservice.domain.model.event;

import lombok.Value;
import tpa.network.eventservice.domain.exception.InvalidDateTimeException;

import java.time.LocalDateTime;

@Value
public class EventDateTime {
    LocalDateTime value;

    public static EventDateTime fromLocalDateTime(LocalDateTime value) {
        validate(value);
        return new EventDateTime(value);
    }

    public static EventDateTime reconstruct(LocalDateTime value) {
        validateNotNull(value);
        return new EventDateTime(value);
    }

    private static void validate(LocalDateTime value) {
        validateNotNull(value);
        if (value.isBefore(LocalDateTime.now())) {
            throw new InvalidDateTimeException("Event date and time cannot be in the past!");
        }
    }

    private static void validateNotNull(LocalDateTime value) {
        if (value == null) {
            throw new InvalidDateTimeException("Event date and time cannot be null!");
        }
    }
}
