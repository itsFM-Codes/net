package tpa.network.authservice.infrastructure.adapter.out.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import tpa.network.authservice.domain.port.out.PasswordEncoderPort;

@Slf4j
@Component
public class PasswordEncoderAdapter implements PasswordEncoderPort {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String encode(String rawPassword) {
        log.debug("Encoding password");
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        log.debug("Checking password match");
        return encoder.matches(rawPassword, encodedPassword);
    }
}
