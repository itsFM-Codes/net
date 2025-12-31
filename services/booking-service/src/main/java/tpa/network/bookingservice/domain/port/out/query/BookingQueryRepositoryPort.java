package tpa.network.bookingservice.domain.port.out.query;

import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.List;
import java.util.Optional;

public interface BookingQueryRepositoryPort {
    List<BookingReadModel> findAll();
    Optional<BookingReadModel> findById(String id);
    List<BookingReadModel> findByUserId(String userId);
}
