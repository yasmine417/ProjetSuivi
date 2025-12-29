package com.SuiviAlimentaire.Authentication.service;

import com.SuiviAlimentaire.Authentication.dto.RegisterRequest;
import com.SuiviAlimentaire.Authentication.entities.Role;
import com.SuiviAlimentaire.Authentication.entities.User;
import com.SuiviAlimentaire.Authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        userRepository.save(user);
        return "Utilisateur créé avec succès";
    }

    public String registerAdmin(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User admin = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.ADMIN
        );

        userRepository.save(admin);
        return "Administrateur créé avec succès";
    }
}