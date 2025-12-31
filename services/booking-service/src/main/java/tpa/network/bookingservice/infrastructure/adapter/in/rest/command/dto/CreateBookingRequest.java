package tpa.network.bookingservice.infrastructure.adapter.in.rest.command.dto;

public record CreateBookingRequest(
        String userId,
        String eventId,
        int quantity
) { }
