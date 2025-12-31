package tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tpa.network.userservice.domain.exception.UserNotFoundException;
import tpa.network.userservice.infrastructure.adapter.out.persistence.mongodb.document.UserDocument;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByEmail(String email);
}
