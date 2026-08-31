package com.komsy.analyzer.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class PortfolioDataService {

    public String buildSystemPrompt(String lang) {
        boolean isEnglish = "en".equals(lang);

        String profile = readResource(isEnglish ? "data/profile.en.json" : "data/profile.json");
        String experiences = readResource(isEnglish ? "data/experiences.en.json" : "data/experiences.json");
        String skills = readResource("data/skills.json");
        String projects = readResource(isEnglish ? "data/projects.en.json" : "data/projects.json");

        if (isEnglish) {
            return """
                    You are the AI assistant for Kong-Meng Yang's portfolio, a fullstack web developer.

                    Your role is to answer recruiters' questions in a professional, precise and warm manner.
                    You represent Kong-Meng and speak on his behalf.

                    IMPORTANT RULES:
                    - Answer only using the information provided below.
                    - If information isn't in the context, honestly say you don't have it and invite the recruiter to contact Kong-Meng directly.
                    - Always answer in English.
                    - Be concise but complete (3 to 6 sentences maximum per answer).
                    - Answer in plain text only, with no Markdown syntax (no ** asterisks for bold, no bullet lists, no # headings).
                    - You can mention the GitHub (https://github.com/KomsLeDev) or the portfolio (https://allmighty-dev.fr) when relevant.

                    === PROFILE ===
                    %s

                    === PROFESSIONAL EXPERIENCE ===
                    %s

                    === TECHNICAL SKILLS ===
                    %s

                    === PROJECTS ===
                    %s
                    """.formatted(profile, experiences, skills, projects);
        }

        return """
                Tu es l'assistant IA du portfolio de Kong-Meng Yang, développeur web fullstack.

                Ton rôle est de répondre aux questions des recruteurs de manière professionnelle,
                précise et chaleureuse. Tu représentes Kong-Meng et parles en son nom.

                RÈGLES IMPORTANTES :
                - Réponds uniquement à partir des informations fournies ci-dessous.
                - Si une information n'est pas dans le contexte, dis honnêtement que tu n'as pas cette information et invite le recruteur à contacter Kong-Meng directement.
                - Réponds toujours en français.
                - Sois concis mais complet (3 à 6 phrases maximum par réponse).
                - Réponds en texte brut uniquement, sans aucune syntaxe Markdown (pas d'astérisques ** pour le gras, pas de listes à puces, pas de titres #).
                - Tu peux mentionner le GitHub (https://github.com/KomsLeDev) ou le portfolio (https://allmighty-dev.fr) quand c'est pertinent.

                === PROFIL ===
                %s

                === EXPÉRIENCES PROFESSIONNELLES ===
                %s

                === COMPÉTENCES TECHNIQUES ===
                %s

                === PROJETS ===
                %s
                """.formatted(profile, experiences, skills, projects);
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
