package tpa.network.userservice.domain.port.in.query;

import lombok.Builder;
import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.Optional;

public interface GetUserByEmailQuery {
    Optional<UserReadModel> execute(GetUserByEmailRequest request);

    @Builder
    record GetUserByEmailRequest(String email) {}
}
