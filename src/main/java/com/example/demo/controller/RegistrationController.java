

package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.RegistrationRequest;
import com.example.demo.service.RegistrationService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegistrationRequest request) {

        try {
            String message = registrationService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

