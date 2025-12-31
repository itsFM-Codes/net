package tpa.network.bookingservice.infrastructure.adapter.in.rest.query.dto;

public record BookingResponse(
        String id,
        String userId,
        String eventId,
        int quantity
) { }
