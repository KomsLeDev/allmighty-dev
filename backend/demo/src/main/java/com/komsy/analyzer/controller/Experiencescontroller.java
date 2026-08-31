package com.komsy.analyzer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/experiences")
public class Experiencescontroller {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Object> getExperiences(@RequestParam(defaultValue = "fr") String lang) {
        try {
            String file = "en".equals(lang) ? "data/experiences.en.json" : "data/experiences.json";
            ClassPathResource resource = new ClassPathResource(file);
            String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(objectMapper.readValue(json, Object.class));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}