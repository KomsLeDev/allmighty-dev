package com.komsy.analyzer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/skills")
public class Skillscontroller {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Object> getSkills() {
        try {
            ClassPathResource resource = new ClassPathResource("data/skills.json");
            String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(objectMapper.readValue(json, Object.class));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}