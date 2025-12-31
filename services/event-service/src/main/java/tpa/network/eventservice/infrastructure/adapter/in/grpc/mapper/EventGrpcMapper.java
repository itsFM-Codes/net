package tpa.network.eventservice.infrastructure.adapter.in.grpc.mapper;

import com.google.protobuf.Timestamp;
import org.springframework.stereotype.Component;
import tpa.network.eventservice.Event;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

import java.time.ZoneId;

@Component
public class EventGrpcMapper {

    private static final ZoneId JAKARTA_ZONE = ZoneId.of("Asia/Jakarta");

    public Event toProto(EventReadModel model) {
        var timestamp = Timestamp.newBuilder()
                .setSeconds(model.getDatetime().atZone(JAKARTA_ZONE).toEpochSecond())
                .setNanos(model.getDatetime().getNano())
                .build();

        return Event.newBuilder()
                .setId(model.getId())
                .setTitle(model.getTitle())
                .setDescription(model.getDescription())
                .setImageUrl(model.getImageUrl())
                .setDatetime(timestamp)
                .setDurationMinutes(model.getDurationMinutes())
                .setLocation(model.getLocation())
                .setPrice(model.getPrice())
                .setCapacity(model.getCapacity())
                .setSeatsAvailable(model.getSeatsAvailable())
                .build();
    }
}
