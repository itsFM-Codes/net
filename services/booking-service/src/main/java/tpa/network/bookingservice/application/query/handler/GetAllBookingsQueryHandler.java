package tpa.network.bookingservice.application.query.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tpa.network.bookingservice.domain.port.in.query.GetAllBookingsQuery;
import tpa.network.bookingservice.domain.port.out.query.BookingQueryRepositoryPort;
import tpa.network.bookingservice.domain.readmodel.BookingReadModel;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetAllBookingsQueryHandler implements GetAllBookingsQuery {
    private final BookingQueryRepositoryPort queryRepository;

    @Override
    public List<BookingReadModel> execute() {
        log.info("Executing GetAllBookingsQuery");
        var bookings = queryRepository.findAll();
        log.info("Successfully retrieved {} bookings", bookings.size());
        return bookings;
    }
}
