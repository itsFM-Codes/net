package tpa.network.eventservice.infrastructure.adapter.in.rest.query.dto;

import java.time.LocalDateTime;

public record EventResponse(
        String id,
        String title,
        String description,
        String imageUrl,
        LocalDateTime datetime,
        int durationMinutes,
        String location,
        double price,
        int capacity,
        int seatsAvailable
) {
}
