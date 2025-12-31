package tpa.network.userservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.model.shared.Id;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.out.command.UserCommandRepositoryPort;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mapper.UserPersistenceMapper;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.repository.UserRepository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class UserCommandRepositoryAdapter implements UserCommandRepositoryPort {
    private final UserRepository repository;
    private final UserPersistenceMapper mapper;

    @Override
    public User insert(User user) {
        log.debug("Inserting user into database with id: {}", user.getId().getValue());
        
        var userDocument = mapper.toDocument(user);
        var insertedUser = repository.save(userDocument);
        
        log.debug("Successfully inserted user with id: {}", insertedUser.getId());
        return mapper.toUser(insertedUser);
    }
}
