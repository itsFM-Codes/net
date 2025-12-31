package tpa.network.eventservice.domain.model.event;

import lombok.Value;

@Value
public class Location {
    String value;

    public static Location fromString(String value) {
        return new Location(value != null ? value : "");
    }
}
