package tpa.network.eventservice.domain.model.event;

import lombok.Value;
import tpa.network.eventservice.domain.exception.InvalidPriceException;

@Value
public class Price {
    double value;

    public static Price fromDouble(double value) {
        validate(value);
        return new Price(value);
    }

    private static void validate(double value) {
        if (value < 0) {
            throw new InvalidPriceException();
        }
    }
}
