package tpa.network.bookingservice.domain.readmodel;

import java.time.Instant;

public record BookingWithEventReadModel(
        String id,
        String userId,
        String eventId,
        int quantity,
        String eventTitle,
        String eventDescription,
        String eventImageUrl,
        Instant eventDatetime,
        int eventDurationMinutes,
        String eventLocation,
        double eventPrice,
        int eventCapacity,
        int eventSeatsAvailable
) { }
