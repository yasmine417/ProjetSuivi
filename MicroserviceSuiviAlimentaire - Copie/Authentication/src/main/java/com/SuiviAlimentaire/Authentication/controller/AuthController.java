package com.SuiviAlimentaire.Authentication.controller;

import com.SuiviAlimentaire.Authentication.dto.LoginRequest;
import com.SuiviAlimentaire.Authentication.dto.LoginResponse;
import com.SuiviAlimentaire.Authentication.dto.RegisterRequest;
import com.SuiviAlimentaire.Authentication.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public void login() {
           }
    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {
        try {
            String result = authenticationService.registerAdmin(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String result = authenticationService.register(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            // Renvoie le message exact et code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
