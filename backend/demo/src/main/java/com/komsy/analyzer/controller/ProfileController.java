package com.komsy.analyzer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Object> getProfile() {
        try {
            ClassPathResource resource = new ClassPathResource("data/profile.json");
            String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(objectMapper.readValue(json, Object.class));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}