package tpa.network.eventservice.infrastructure.adapter.in.rest.command.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateEventRequest(
        @NotBlank(message = "Title is required") String title,
        String description,
        String imageUrl,
        @NotBlank(message = "Date and time is required") String datetime,
        @Positive(message = "Duration must be positive") int durationMinutes,
        String location,
        @PositiveOrZero(message = "Price must be zero or positive") double price,
        @Positive(message = "Capacity must be positive") int capacity
) {
}
