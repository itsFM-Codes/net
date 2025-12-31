package tpa.network.userservice.domain.model.shared;

import lombok.Value;
import org.bson.types.ObjectId;

@Value
public class Id {
    String value;

    public static Id generate() {
        return new Id(new ObjectId().toString());
    }

    public static Id fromString(String value) {
        return new Id(value);
    }
}