package tpa.network.authservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class AuthServiceApplication {

    public static void main(String[] args) {
        log.info("Starting Auth Service Application...");
        SpringApplication.run(AuthServiceApplication.class, args);
    }

}
