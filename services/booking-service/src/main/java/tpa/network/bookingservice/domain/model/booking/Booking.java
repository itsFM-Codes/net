package tpa.network.bookingservice.domain.model.booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpa.network.bookingservice.domain.model.shared.Id;

@Data
@AllArgsConstructor
public class Booking {

    @org.springframework.data.annotation.Id
    private Id id;

    private UserId userId;
    private EventId eventId;
    private Quantity quantity;

    public static Booking create(String userId, String eventId, int quantity) {
        return new Booking(
                Id.generate(),
                UserId.fromString(userId),
                EventId.fromString(eventId),
                Quantity.fromInt(quantity)
        );
    }
}
