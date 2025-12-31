package tpa.network.authservice.domain.model.shared;

import lombok.Value;

@Value
public class Id {
    String value;

    public static Id fromString(String value) {
        return new Id(value);
    }
}
