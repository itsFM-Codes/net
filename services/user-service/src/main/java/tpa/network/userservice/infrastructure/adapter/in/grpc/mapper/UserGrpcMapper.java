package tpa.network.userservice.infrastructure.adapter.in.grpc.mapper;

import org.springframework.stereotype.Component;
import tpa.network.userservice.User;
import tpa.network.userservice.domain.readmodel.UserReadModel;

@Component
public class UserGrpcMapper {

    public User toProto(UserReadModel model) {
        return User.newBuilder()
                .setId(model.id())
                .setUsername(model.username())
                .setEmail(model.email())
                .setPasswordHash(model.password())
                .build();
    }
}
