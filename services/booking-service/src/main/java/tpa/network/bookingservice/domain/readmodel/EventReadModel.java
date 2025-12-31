package tpa.network.bookingservice.domain.readmodel;

import java.time.Instant;

public record EventReadModel(
        String id,
        String title,
        String description,
        String imageUrl,
        Instant datetime,
        int durationMinutes,
        String location,
        double price,
        int capacity,
        int seatsAvailable
) { }
