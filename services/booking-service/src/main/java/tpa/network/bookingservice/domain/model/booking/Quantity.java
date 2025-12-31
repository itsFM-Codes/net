package tpa.network.bookingservice.domain.model.booking;

import lombok.Value;
import tpa.network.bookingservice.domain.exception.InvalidQuantityException;

@Value
public class Quantity {
    int value;

    public static Quantity fromInt(int value) {
        validate(value);
        return new Quantity(value);
    }

    private static void validate(int value) {
        if (value <= 0) {
            throw new InvalidQuantityException("Quantity must be greater than 0!");
        }
    }
}
