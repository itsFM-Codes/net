package tpa.network.eventservice.domain.model.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpa.network.eventservice.domain.model.shared.Id;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Event {

    @org.springframework.data.annotation.Id
    private Id id;

    private Title title;
    private Description description;
    private String imageUrl;
    
    private EventDateTime datetime;
    private int durationMinutes;
    
    private Location location;
    private Price price;
    
    private Capacity capacity;
    private int seatsAvailable;

    public static Event create(
            String title,
            String description,
            String imageUrl,
            String datetime,
            int durationMinutes,
            String location,
            double price,
            int capacity
    ) {
        return new Event(
                Id.generate(),
                Title.fromString(title),
                Description.fromString(description),
                imageUrl,
                EventDateTime.fromLocalDateTime(LocalDateTime.parse(datetime)),
                durationMinutes,
                Location.fromString(location),
                Price.fromDouble(price),
                Capacity.fromInt(capacity),
                capacity
        );
    }
}
