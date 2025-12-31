package tpa.network.eventservice.domain.readmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventReadModel {
    private String id;
    private String title;
    private String description;
    private String imageUrl;
    private LocalDateTime datetime;
    private int durationMinutes;
    private String location;
    private double price;
    private int capacity;
    private int seatsAvailable;
}
