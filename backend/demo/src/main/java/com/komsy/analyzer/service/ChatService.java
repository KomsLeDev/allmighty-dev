package com.komsy.analyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class ChatService {

    // Détection basique (non bloquante) de tentatives d'injection de prompt, à des fins de supervision.
    // Ce n'est pas une protection complète : le vrai rempart reste la séparation system/user et le prompt
    // contraint construit par PortfolioDataService.
    private static final Pattern INJECTION_PATTERN = Pattern.compile(
        "ignore (all |previous |the )*instructions|system prompt|disregard (the )?(above|previous)|you are now|forget (your|all) (previous )?instructions",
        Pattern.CASE_INSENSITIVE
    );

    @Value("${anthropic.api.key}")
    private String apiKey;

    @Value("${anthropic.api.url}")
    private String apiUrl;

    @Value("${anthropic.model}")
    private String model;

    private final PortfolioDataService portfolioDataService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public ChatService(PortfolioDataService portfolioDataService) {
        this.portfolioDataService = portfolioDataService;
    }

    public String answer(String userMessage, String lang) {
        boolean isEnglish = "en".equals(lang);
        if (userMessage == null || userMessage.isBlank()) {
            return isEnglish
                ? "Ask me a question about Kong-Meng's background, skills or projects."
                : "Posez-moi une question sur le parcours, les compétences ou les projets de Kong-Meng.";
        }

        if (INJECTION_PATTERN.matcher(userMessage).find()) {
            System.out.println("Tentative potentielle d'injection de prompt detectee : " + userMessage);
        }

        try {
            // Construction du body JSON
            Map<String, Object> body = Map.of(
                "model", model,
                "max_tokens", 1024,
                "system", portfolioDataService.buildSystemPrompt(lang),
                "messages", List.of(
                    Map.of("role", "user", "content", userMessage)
                )
            );

            String jsonBody = objectMapper.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode json = objectMapper.readTree(response.body());
                return json.path("content").get(0).path("text").asText();
            } else {
                System.err.println("Erreur Anthropic API - status: " + response.statusCode() + " - body: " + response.body());
                return isEnglish
                    ? "I'm experiencing a technical issue. Please try again in a moment."
                    : "Je rencontre un problème technique. Veuillez réessayer dans quelques instants.";
            }

        } catch (Exception e) {
            System.err.println("Exception lors de l'appel Anthropic : " + e.getMessage());
            return isEnglish
                ? "I'm experiencing a technical issue. Please try again in a moment."
                : "Je rencontre un problème technique. Veuillez réessayer dans quelques instants.";
        }
    }
}