package tpa.network.bookingservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class BookingServiceApplication {

    public static void main(String[] args) {
        log.info("Starting Booking Service Application");
        SpringApplication.run(BookingServiceApplication.class, args);
    }

}
