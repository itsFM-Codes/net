package tpa.network.eventservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class EventServiceApplication {

   public static void main(String[] args) {
        log.info("Starting Event Service Application...");
        SpringApplication.run(EventServiceApplication.class, args);
    }

}
