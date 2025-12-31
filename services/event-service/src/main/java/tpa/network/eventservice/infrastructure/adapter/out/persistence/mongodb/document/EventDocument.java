package tpa.network.eventservice.infrastructure.adapter.out.persistence.mongodb.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "events")
public class EventDocument implements Persistable<String> {

    @Id
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

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public EventDocument(String id, String title, String description, String imageUrl,
                        LocalDateTime datetime, int durationMinutes, String location,
                        double price, int capacity, int seatsAvailable) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.datetime = datetime;
        this.durationMinutes = durationMinutes;
        this.location = location;
        this.price = price;
        this.capacity = capacity;
        this.seatsAvailable = seatsAvailable;
    }

    @Override
    public boolean isNew() {
        return createdAt == null;
    }
}
