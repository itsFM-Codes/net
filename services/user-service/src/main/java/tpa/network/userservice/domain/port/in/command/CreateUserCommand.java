package tpa.network.userservice.domain.port.in.command;

import tpa.network.userservice.domain.model.shared.Id;

public interface CreateUserCommand {
    Id execute(CreateUserRequest request);

    record CreateUserRequest(String username, String email, String password) { }
}