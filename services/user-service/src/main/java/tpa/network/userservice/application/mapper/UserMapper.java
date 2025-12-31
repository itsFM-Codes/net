package tpa.network.userservice.application.mapper;

import org.springframework.stereotype.Component;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.readmodel.UserReadModel;

@Component
public class UserMapper {

    public UserReadModel toReadModel(User user) {
        return new UserReadModel(
                user.getId().getValue(),
                user.getUsername().getValue(),
                user.getEmail().getValue(),
                user.getPassword().getValue()
        );
    }
}
