package com.komsy.analyzer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<Object> getProjects() {
        try {
            ClassPathResource resource = new ClassPathResource("data/projects.json");
            String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(objectMapper.readValue(json, Object.class));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}