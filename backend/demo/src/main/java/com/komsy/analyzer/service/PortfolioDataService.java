package com.komsy.analyzer.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class PortfolioDataService {

    public String buildSystemPrompt() {
        return """
                Tu es l'assistant IA du portfolio de Kong-Meng Yang, développeur web fullstack.
                
                Ton rôle est de répondre aux questions des recruteurs de manière professionnelle,
                précise et chaleureuse. Tu représentes Kong-Meng et parles en son nom.
                
                RÈGLES IMPORTANTES :
                - Réponds uniquement à partir des informations fournies ci-dessous.
                - Si une information n'est pas dans le contexte, dis honnêtement que tu n'as pas cette information et invite le recruteur à contacter Kong-Meng directement.
                - Réponds toujours en français.
                - Sois concis mais complet (3 à 6 phrases maximum par réponse).
                - Tu peux mentionner le GitHub (https://github.com/KomsLeDev) ou le portfolio (https://allmighty-dev.fr) quand c'est pertinent.
                
                === PROFIL ===
                %s
                
                === EXPÉRIENCES PROFESSIONNELLES ===
                %s
                
                === COMPÉTENCES TECHNIQUES ===
                %s
                
                === PROJETS ===
                %s
                """.formatted(
                readResource("data/profile.json"),
                readResource("data/experiences.json"),
                readResource("data/skills.json"),
                readResource("data/projects.json")
        );
    }

    private String readResource(String path) {
        try {
            ClassPathResource resource = new ClassPathResource(path);
            return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            return "Données non disponibles pour : " + path;
        }
    }
}