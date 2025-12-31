package tpa.network.userservice.infrastructure.adapter.in.rest.query;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpa.network.userservice.domain.port.in.query.GetAllUsersQuery;
import tpa.network.userservice.domain.port.in.query.GetUserByIdQuery;
import tpa.network.userservice.domain.readmodel.UserReadModel;
import tpa.network.userservice.infrastructure.adapter.in.rest.query.dto.UserResponse;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserQueryController {
    private final GetAllUsersQuery getAllUsersQuery;
    private final GetUserByIdQuery getUserByIdQuery;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        log.info("REST API - Received request to get all users");
        
        var users = getAllUsersQuery.execute();
        log.info("REST API - Found {} users", users.size());
        
        return ResponseEntity.ok(
                users.stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable String id
    ) {
        log.info("REST API - Received request to get user by id: {}", id);
        
        return getUserByIdQuery.execute(id)
                .map(u -> {
                    log.info("REST API - Found user with id: {}", id);
                    return ResponseEntity.ok(toResponse(u));
                })
                .orElseGet(() -> {
                    log.warn("REST API - User not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    private UserResponse toResponse(UserReadModel user) {
        return new UserResponse(
                user.id(),
                user.username(),
                user.email(),
                user.password()
        );
    }
}
