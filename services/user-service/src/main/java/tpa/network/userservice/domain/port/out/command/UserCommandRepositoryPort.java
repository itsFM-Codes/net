package tpa.network.userservice.domain.port.out.command;

import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;

public interface UserCommandRepositoryPort {
    User insert(User user);
}
