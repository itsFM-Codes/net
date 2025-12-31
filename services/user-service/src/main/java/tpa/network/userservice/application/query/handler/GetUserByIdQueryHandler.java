package tpa.network.userservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.application.mapper.UserMapper;
import tpa.network.userservice.domain.port.in.query.GetUserByIdQuery;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetUserByIdQueryHandler implements GetUserByIdQuery {
    private final UserQueryRepositoryPort queryRepository;
    private final UserMapper mapper;

    @Override
    public Optional<UserReadModel> execute(String id) {
        log.info("Executing GetUserByIdQuery for userId: {}", id);
        
        var user = queryRepository.findById(id).map(mapper::toReadModel);
        
        if (user.isPresent()) {
            log.info("Found user with id: {}", id);
        } else {
            log.warn("User not found with id: {}", id);
        }
        
        return user;
    }
}
