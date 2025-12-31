package tpa.network.bookingservice.domain.port.out.grpc;

public interface UserServicePort {
    boolean existsById(String userId);
}
