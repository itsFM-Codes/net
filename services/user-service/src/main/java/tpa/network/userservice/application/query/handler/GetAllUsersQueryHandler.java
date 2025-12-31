package tpa.network.userservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.userservice.application.mapper.UserMapper;
import tpa.network.userservice.domain.port.in.query.GetAllUsersQuery;
import tpa.network.userservice.domain.port.out.query.UserQueryRepositoryPort;
import tpa.network.userservice.domain.readmodel.UserReadModel;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetAllUsersQueryHandler implements GetAllUsersQuery {
    private final UserQueryRepositoryPort queryRepository;
    private final UserMapper mapper;

    @Override
    public List<UserReadModel> execute() {
        log.info("Executing GetAllUsersQuery");
        
        var users = queryRepository.findAll()
                .stream()
                .map(mapper::toReadModel)
                .collect(Collectors.toList());
        
        log.info("Retrieved {} users", users.size());
        return users;
    }
}