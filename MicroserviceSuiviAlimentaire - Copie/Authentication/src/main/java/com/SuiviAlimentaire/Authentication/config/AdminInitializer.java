package com.SuiviAlimentaire.Authentication.config;

import com.SuiviAlimentaire.Authentication.entities.Role;
import com.SuiviAlimentaire.Authentication.entities.User;
import com.SuiviAlimentaire.Authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            User admin = new User(
                    "admin",
                    "admin@admin.com",
                    passwordEncoder.encode("Admin@123"),
                    Role.ADMIN
            );
            userRepository.save(admin);
            System.out.println(" Admin par défaut créé avec succès !");


        }
    }
}