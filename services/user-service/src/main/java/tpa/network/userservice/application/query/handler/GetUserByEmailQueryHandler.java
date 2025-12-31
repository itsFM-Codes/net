package tpa.network.userservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.application.mapper.UserMapper;
import tpa.network.userservice.domain.port.in.query.GetUserByEmailQuery;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetUserByEmailQueryHandler implements GetUserByEmailQuery {
    private final UserQueryRepositoryPort queryRepository;
    private final UserMapper mapper;

    @Override
    public Optional<UserReadModel> execute(GetUserByEmailRequest request) {
        log.info("Executing GetUserByEmailQuery for email: {}", request.email());

        var user = queryRepository.findByEmail(request.email()).map(mapper::toReadModel);

        if (user.isPresent()) {
            log.info("Found user with email: {}", request.email());
        } else {
            log.warn("User not found with email: {}", request.email());
        }

        return user;
    }
}
