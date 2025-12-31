package tpa.network.userservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class UserServiceApplication {

	public static void main(String[] args) {
		log.info("Starting User Service Application...");
		SpringApplication.run(UserServiceApplication.class, args);
	}

}
