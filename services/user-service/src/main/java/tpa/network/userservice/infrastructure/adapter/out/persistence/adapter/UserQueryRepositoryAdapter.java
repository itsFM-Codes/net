package tpa.network.userservice.infrastructure.adapter.out.persistence.adapter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.model.user.User;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mapper.UserPersistenceMapper;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Repository
@RequiredArgsConstructor
public class UserQueryRepositoryAdapter implements UserQueryRepositoryPort {
    private final UserRepository repository;
    private final UserPersistenceMapper mapper;

    @Override
    public List<User> findAll() {
        log.debug("Querying database for all users");
        
        var users = repository.findAll()
                .stream()
                .map(mapper::toUser)
                .collect(Collectors.toList());
        
        log.debug("Retrieved {} users from database", users.size());
        return users;
    }

    @Override
    public Optional<User> findById(String id) {
        log.debug("Querying database for user with id: {}", id);
        
        var user = repository.findById(id).map(mapper::toUser);
        
        if (user.isPresent()) {
            log.debug("Found user in database with id: {}", id);
        } else {
            log.debug("User not found in database with id: {}", id);
        }
        
        return user;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        log.debug("Querying database for user with email: {}", email);
        
        var user = repository.findByEmail(email).map(mapper::toUser);
        
        if (user.isPresent()) {
            log.debug("Found user in database with email: {}", email);
        } else {
            log.debug("User not found in database with email: {}", email);
        }
        
        return user;
    }
}
