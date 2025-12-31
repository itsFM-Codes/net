package tpa.network.userservice.domain.port.in.query;

import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.Optional;

public interface GetUserByIdQuery {
    Optional<UserReadModel> execute(String id);
}
