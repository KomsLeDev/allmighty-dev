package com.komsy.analyzer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/labs")
public class LabsController {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Object> getLabs(@RequestParam(defaultValue = "fr") String lang) {
        try {
            String file = "en".equals(lang) ? "data/labs.en.json" : "data/labs.json";
            ClassPathResource resource = new ClassPathResource(file);
            String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(objectMapper.readValue(json, Object.class));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
