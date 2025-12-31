package tpa.network.eventservice.domain.model.event;

import lombok.Value;
import tpa.network.eventservice.domain.exception.InvalidTitleException;

@Value
public class Title {
    String value;

    public static Title fromString(String value) {
        validate(value);
        return new Title(value);
    }

    private static void validate(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new InvalidTitleException("Title cannot be null or empty!");
        }
        
        if (value.length() < 3) {
            throw new InvalidTitleException("Title must be at least 3 characters long!");
        }
        
        if (value.length() > 200) {
            throw new InvalidTitleException("Title must not exceed 200 characters!");
        }
    }
}
