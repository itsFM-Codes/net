package tpa.network.eventservice.domain.model.event;

import lombok.Value;

@Value
public class Description {
    String value;

    public static Description fromString(String value) {
        return new Description(value != null ? value : "");
    }
}
