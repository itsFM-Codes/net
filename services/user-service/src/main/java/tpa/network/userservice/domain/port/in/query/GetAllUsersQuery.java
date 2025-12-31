package tpa.network.userservice.domain.port.in.query;

import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.List;

public interface GetAllUsersQuery {
    List<UserReadModel> execute();
}