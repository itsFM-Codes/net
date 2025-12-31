package tpa.network.bookingservice.infrastructure.adapter.in.rest.query.dto;

import java.time.Instant;

public record BookingWithEventResponse(
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
