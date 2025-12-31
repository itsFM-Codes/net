package tpa.network.userservice.application.command.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.domain.exception.EmailTakenException;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.in.command.CreateUserCommand;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateUserCommandHandler implements CreateUserCommand {
    private final UserQueryRepositoryPort queryRepository;
    private final UserCommandRepositoryPort commandRepository;

    @Override
    public Id execute(CreateUserRequest request) {
        log.info("Executing CreateUserCommand for email: {}", request.email());
        
        if (queryRepository.findByEmail(request.email()).isPresent()) {
            log.warn("Failed to create user - email already taken: {}", request.email());
            throw new EmailTakenException();
        }

        User user = User.create(
                request.username(),
                request.email(),
                request.password()
        );

        User savedUser = commandRepository.insert(user);
        log.info("Successfully created user with id: {}", savedUser.getId().getValue());
        return savedUser.getId();
    }
}
