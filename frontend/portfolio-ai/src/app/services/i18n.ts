import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export type Lang = 'fr' | 'en';

type Dict = Record<string, string>;

const FR: Dict = {
  'nav.about': 'À PROPOS',
  'nav.skills': 'COMPÉTENCES',
  'nav.experience': 'EXPÉRIENCES',
  'nav.projects': 'PROJETS',
  'nav.devops': 'DEVOPS',
  'nav.damageDetector': 'PROJET IA',
  'nav.labs': 'LABS',
  'nav.github': 'GITHUB',

  'hero.availability': 'RECHERCHE STAGE · 15 FÉV – 12 MARS 2027',
  'hero.subtitle': 'Développeur Full Stack · Sécurité applicative & DevSecOps',
  'hero.specialityPrefix': 'Spécialisé en',
  'hero.specialityAnd': '&',
  'hero.secondaryPrefix': 'Bon connaisseur de',
  'hero.secondaryAnd': '&',
  'hero.devopsNote': ', avec une pratique sécurité côté développeur (CORS, gestion des secrets)',
  'hero.cyberNote': "En formation Spécialiste Cybersécurité (RS7394), avec pour objectif un poste en sécurité applicative (AppSec) ou DevSecOps",
  'hero.cyberChip': 'Cybersécurité',
  'hero.contactCta': 'Me contacter',
  'hero.viewPath': 'Voir mon parcours',
  'hero.downloadCv': 'Télécharger le CV',
  'stats.experience': "ans d'alternance",
  'stats.technologies': 'technologies',
  'stats.projects': 'projets réalisés',

  'chat.title': 'Assistant IA',
  'chat.idlePrompt': 'Posez-moi une question<br />sur le parcours de Kong-Meng !',
  'chat.thinking': 'En train de réfléchir...',
  'chat.talking': "En train d'écrire...",
  'chat.placeholder': 'Écrivez votre question...',
  'chat.note': 'Réponses générées par IA',
  'chat.greeting': 'Bonjour ! Je suis votre assistant IA. Posez-moi une question sur le parcours, les compétences ou les projets de Kong-Meng.',
  'chat.noAnswer': "Je n'ai pas reçu de réponse.",
  'chat.error': 'Erreur : impossible de contacter le backend.',
  'chat.expand': 'Agrandir le chat',
  'chat.collapse': 'Réduire le chat',

  'aiSection.label': "L'ASSISTANT IA",
  'aiSection.title': 'Comment fonctionne le chat',
  'aiSection.text': "Le chat ci-dessus est propulsé par l'API Claude d'Anthropic (modèle Haiku), appelée depuis mon backend Spring Boot. Ce n'est pas un simple habillage conversationnel : à chaque question, le serveur construit dynamiquement un prompt système à partir de mes données réelles — profil, expériences, compétences et projets — stockées en JSON et exposées par ma propre API. L'IA est donc contrainte à ce contexte : elle ne répond jamais au hasard, et dit honnêtement quand une information n'y figure pas plutôt que de l'inventer. L'objectif est de donner aux recruteurs un moyen interactif d'explorer mon profil, avec des réponses toujours fidèles à la réalité.",

  'siteAbout.label': 'À PROPOS DE CE SITE',
  'siteAbout.title': 'Comment ce portfolio est construit',
  'siteAbout.text': "Ce site n'a pas été fait avec un générateur de portfolio ou un site spécialisé : il est codé, hébergé et déployé de A à Z par mes propres moyens, comme une vraie application plutôt qu'une simple vitrine statique. Le frontend est développé en Angular 21 et communique avec une API REST Spring Boot qui expose mon profil, mes compétences, mes expériences et mes projets. Il intègre un assistant conversationnel propulsé par l'API Claude d'Anthropic, capable de répondre en direct aux questions sur mon parcours, et il est entièrement bilingue français/anglais. Côté infrastructure, les deux applications sont conteneurisées avec Docker, testées et validées automatiquement à chaque push grâce à une pipeline d'intégration continue GitHub Actions, puis déployées en continu : le backend sur Railway, le frontend sur Vercel.",
  'siteAbout.placeholder': "Schéma d'architecture à venir",
  'siteAbout.repoLink': 'Voir le code source sur GitHub',

  'skills.label': 'COMPÉTENCES TECHNIQUES',
  'skills.title': 'Mon stack',
  'skill.cybersecurite': 'Cybersécurité (en formation, RS7394)',
  'skill.frontend': 'Frontend',
  'skill.backend': 'Backend',
  'skill.base_de_donnees': 'Base de données',
  'skill.lowcode': 'Low-Code',
  'skill.outils': 'Outils',
  'skill.methodologies': 'Méthodologies',

  'experience.label': 'PARCOURS PROFESSIONNEL',
  'experience.title': 'Expériences',
  'experience.learnMore': 'En savoir plus sur ce poste →',
  'education.title': 'Master MIAGE – Mention assez bien',
  'education.school': "Université d'Orléans – UFR Sciences & Techniques",
  'education.badge': 'Formation',
  'education.period': '2022 – 2025',
  'education.location': 'Orléans',
  'education.mission1': 'Méthodes Informatiques Appliquées à la Gestion des Entreprises',
  'education.mission2': 'Formation en alternance : développement web, gestion de projet, systèmes d\'information',

  'cyberFormation.title': 'Spécialiste Cybersécurité — Certification RS7394',
  'cyberFormation.school': 'M2i / Skolae, Orléans',
  'cyberFormation.badge': 'Formation (en cours)',
  'cyberFormation.period': '2026 – 2027',
  'cyberFormation.location': 'Orléans',
  'cyberFormation.mission1': "Préparation à la certification RS7394 — Tests d'intrusion (Pentesting)",
  'cyberFormation.mission2': "Bases en cours d'acquisition : réseau (OSI, TCP/IP), systèmes Linux & Windows, méthodologie de test d'intrusion, Python, durcissement des systèmes, analyse de risques EBIOS RM, bases SOC/SIEM (Splunk)",
  'cyberFormation.mission3': 'TryHackMe — parcours Pre Security en cours',

  'projects.label': 'PROJETS RÉALISÉS',
  'projects.title': 'Quelques projets',
  'projects.viewProject': 'Voir le projet →',

  'damageDetector.label': "EN DEHORS D'ANGULAR",
  'damageDetector.title': 'Un peu de React et Node.js',
  'damageDetector.text': "Pour sortir de l'écosystème Angular/Spring Boot utilisé dans le reste de ce portfolio, j'ai développé ce projet avec une autre stack : React côté frontend, Node.js/Express côté backend. L'application s'appuie sur l'IA pour analyser une photo, détecter les objets visibles et estimer les dégâts, la perte et le prix des biens concernés — un cas d'usage pensé notamment pour le secteur de l'assurance, où ça peut accélérer et fiabiliser l'évaluation d'un sinistre.",
  'damageDetector.cta': 'Voir le projet',

  'labs.label': 'ENTRAÎNEMENT CYBERSÉCURITÉ',
  'labs.title': 'Labs & Write-ups',
  'labs.intro': "Ma progression en formation RS7394, documentée au fil de l'eau : salles TryHackMe, machines HackTheBox/Root-Me, CTF et TP du cursus M2i. Chaque write-up détaille la méthodologie suivie, pas juste le résultat.",
  'labs.linkedinLearning': 'Voir mes certifications LinkedIn Learning',
  'labs.tryhackmeProfile': 'Voir mon profil TryHackMe →',
  'labs.viewWriteup': 'Voir le write-up →',
  'labs.emptyTitle': 'Premiers write-ups en cours de rédaction',
  'labs.emptyText': "Cette section s'alimente au fur et à mesure de ma formation (TryHackMe, HackTheBox, Root-Me, CTF, TP M2i) — reviens bientôt, ou suis ma progression en direct via mon profil TryHackMe ci-dessus.",

  'secCase.label': 'ÉTUDE DE CAS',
  'secCase.title': 'Sécuriser mon portfolio',
  'secCase.intro': "Au-delà du code applicatif, j'ai appliqué une vraie démarche DevSecOps sur ce site lui-même — pour démontrer concrètement les mesures que je compte appliquer en stage AppSec/DevSecOps. Voici ce qui a été mis en place, pourquoi, et ce que ça a révélé.",
  'secCase.headers.title': 'En-têtes de sécurité HTTP',
  'secCase.headers.text': "Par défaut, un site web ne précise rien au navigateur sur ses propres règles de sécurité. J'ai ajouté une Content-Security-Policy stricte (sources de script/style/police explicitement listées), ainsi que HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy et Permissions-Policy, sur les deux domaines du site (portfolio et détecteur de dégâts).",
  'secCase.headers.before': 'Avant (securityheaders.com)',
  'secCase.headers.after': 'Après',
  'secCase.api.title': "Durcissement de l'API IA",
  'secCase.api.text': "L'assistant conversationnel du site appelle l'API Claude d'Anthropic, qui a un coût réel par requête. C'est la partie la plus sensible du backend — et celle où j'ai trouvé le problème le plus concret de tout ce chantier.",
  'secCase.api.findingTitle': "Finding réel : CORS totalement ouvert sur l'endpoint IA",
  'secCase.api.findingText': 'Le contrôleur du chat avait une annotation @CrossOrigin(origins = "*") qui court-circuitait la configuration CORS globale, pourtant correctement restreinte ailleurs. N\'importe quel site aurait pu intégrer du JavaScript consommant mon quota IA à mes frais. Vérifié avec une requête simulant une origine malveillante : 200 OK avant correction, 403 après.',
  'secCase.api.measure1': "Suppression du CORS wildcard : l'endpoint respecte maintenant la restriction d'origine globale",
  'secCase.api.measure2': 'Rate limiting : 10 requêtes par minute et par IP',
  'secCase.api.measure3': 'Taille maximale du message utilisateur (1000 caractères) et plafond de tokens en sortie (1024)',
  'secCase.api.measure4': "Détection basique (non bloquante) de tentatives d'injection de prompt, à des fins de supervision",
  'secCase.cicd.title': 'Sécurité intégrée à la CI/CD',
  'secCase.cicd.text': 'Plutôt que de vérifier la sécurité ponctuellement, les contrôles tournent automatiquement à chaque push, en parallèle des tests.',
  'secCase.cicd.gitleaks': "Scan de secrets committés dans tout l'historique Git",
  'secCase.cicd.dependabot': 'Mises à jour automatiques des dépendances vulnérables',
  'secCase.cicd.npmAudit': 'Vulnérabilités connues des dépendances npm (3 projets)',
  'secCase.cicd.dependencyCheck': 'Vulnérabilités connues côté Java/Maven (base NVD)',
  'secCase.cicd.trivy': 'Scan de dépendances et bonnes pratiques Dockerfile',
  'secCase.cicd.codeql': 'Analyse statique du code (SAST) en JavaScript/TypeScript et Java',
  'secCase.story.title': "Ce que j'en retiens",
  'secCase.story.text': "Pendant ce travail, j'ai eu une vraie clé API en clair dans un fichier de configuration local, le temps d'un test — jamais committée, repérée avant tout commit grâce à une relecture systématique du diff avant chaque \"git add\". Ça confirme l'intérêt des bons réflexes vus en formation : variables d'environnement uniquement, jamais de secret en dur, et vérification du contenu avant de pousser quoi que ce soit.",
  'secCase.story.lesson1': 'Toujours relire git status/git diff avant un commit, même sous pression de temps',
  'secCase.story.lesson2': 'Centraliser les secrets en variables d\'environnement dès le premier jour, pas après coup',
  'secCase.story.lesson3': 'Ajouter gitleaks en CI comme filet de sécurité supplémentaire, pas comme seule ligne de défense',

  'devops.label': 'COULISSES TECHNIQUES',
  'devops.title': 'De Git à la production',
  'devops.intro': "Ce portfolio est aussi l'occasion de mettre en place un début de démarche DevOps : Docker pour reproduire fidèlement l'environnement dans lequel l'application va tourner, et GitHub Actions pour tester et vérifier automatiquement chaque déploiement avant qu'il n'arrive en production.",
  'devops.git.title': 'Versioning',
  'devops.git.desc': 'Un monorepo Git (frontend Angular + backend Spring Boot) versionné sur GitHub.',
  'devops.ci.title': 'Intégration continue',
  'devops.ci.desc': "À chaque push, GitHub Actions build et teste automatiquement les deux applications.",
  'devops.docker.title': 'Conteneurisation',
  'devops.docker.desc': "Chaque service est packagé dans une image Docker via un build multi-stage.",
  'devops.deploy.title': 'Déploiement continu',
  'devops.deploy.desc': 'Le backend est déployé sur Railway et le frontend sur Vercel, automatiquement à chaque changement sur main.',
  'devops.deploy.caption': "Les deux services se redéploient automatiquement à partir du même commit. Les secrets (comme la clé API Anthropic) sont stockés en variable d'environnement sur Railway, jamais dans le code.",
  'devops.placeholder': 'Illustration à venir',
  'devops.caseStudyLink': "Lire l'étude de cas complète : sécuriser ce portfolio →",

  'footer.copyright': '© 2026 Kong-Meng Yang',

  'detail.back': 'Retour au portfolio',
  'detail.viewGithub': 'Voir sur GitHub',
  'detail.viewSite': 'Voir le site →',
  'detail.privateBadge': '🔒 Dépôt de code privé',
  'detail.confidentialBadge': '🔒 Projet confidentiel – réalisé en entreprise',
  'detail.roleContext': 'Rôle & contexte',
  'detail.roleLabel': 'Rôle :',
  'detail.contextLabel': 'Contexte :',
  'detail.about': 'À propos du projet',
  'detail.results': 'Résultats & impact',
  'detail.technologies': 'Technologies utilisées',
  'detail.screenshots': "Captures d'écran",
  'detail.privateTitle': 'Dépôt de code privé',
  'detail.privateText': "Ce projet a été réalisé en groupe dans le cadre de ma formation. Le dépôt de code est privé, mais je peux en parler en détail sur demande.",
  'detail.confidentialTitle': 'Projet réalisé en entreprise',
  'detail.confidentialText': "Ce projet a été développé dans un environnement professionnel. Les captures d'écran et détails sensibles ont été volontairement omis pour respecter la confidentialité.",
  'detail.notFound': 'Projet introuvable',
  'detail.backButton': 'Retour',
  'detail.loadError': 'Impossible de charger les projets',
  'detail.loadErrorText': "Le serveur ne répond pas (vérifie qu'il est bien démarré et accessible).",
};

const EN: Dict = {
  'nav.about': 'ABOUT',
  'nav.skills': 'SKILLS',
  'nav.experience': 'EXPERIENCE',
  'nav.projects': 'PROJECTS',
  'nav.devops': 'DEVOPS',
  'nav.damageDetector': 'AI PROJECT',
  'nav.labs': 'LABS',
  'nav.github': 'GITHUB',

  'hero.availability': 'SEEKING INTERNSHIP · FEB 15 – MAR 12 2027',
  'hero.subtitle': 'Full Stack Developer · Application Security & DevSecOps',
  'hero.specialityPrefix': 'Specialized in',
  'hero.specialityAnd': '&',
  'hero.secondaryPrefix': 'Good working knowledge of',
  'hero.secondaryAnd': '&',
  'hero.devopsNote': ', with hands-on security practice as a developer (CORS, secrets management)',
  'hero.cyberNote': 'Currently training as a Cybersecurity Specialist (RS7394), aiming for a role in application security (AppSec) or DevSecOps',
  'hero.cyberChip': 'Cybersecurity',
  'hero.contactCta': 'Contact me',
  'hero.viewPath': 'View my background',
  'hero.downloadCv': 'Download CV',
  'stats.experience': 'years of experience',
  'stats.technologies': 'technologies',
  'stats.projects': 'projects delivered',

  'chat.title': 'AI Assistant',
  'chat.idlePrompt': "Ask me a question<br />about Kong-Meng's background!",
  'chat.thinking': 'Thinking...',
  'chat.talking': 'Typing...',
  'chat.placeholder': 'Type your question...',
  'chat.note': 'Answers generated by AI',
  'chat.greeting': "Hello! I'm your AI assistant. Ask me a question about Kong-Meng's background, skills or projects.",
  'chat.noAnswer': "I didn't receive an answer.",
  'chat.error': 'Error: unable to reach the backend.',
  'chat.expand': 'Expand chat',
  'chat.collapse': 'Collapse chat',

  'aiSection.label': 'THE AI ASSISTANT',
  'aiSection.title': 'How the chat works',
  'aiSection.text': "The chat above is powered by Anthropic's Claude API (Haiku model), called from my Spring Boot backend. It isn't just a chat widget bolted on top: on every question, the server dynamically builds a system prompt from my actual data — profile, experience, skills and projects — stored as JSON and served through my own API. The AI is constrained to that context: it never answers at random, and honestly says when something isn't covered rather than making it up. The goal is to give recruiters an interactive way to explore my background, with answers that always stay grounded in reality.",

  'siteAbout.label': 'ABOUT THIS SITE',
  'siteAbout.title': 'How this portfolio is built',
  'siteAbout.text': "This site wasn't built with a portfolio generator or a specialized website builder: it's coded, hosted and deployed end-to-end by my own means, like a real application rather than a static showcase. The frontend is built with Angular 21 and talks to a Spring Boot REST API exposing my profile, skills, experience and projects. It includes a conversational assistant powered by Anthropic's Claude API, able to answer questions about my background live, and the whole site is fully bilingual (French/English). On the infrastructure side, both applications are containerized with Docker, automatically built and tested on every push through a GitHub Actions CI pipeline, then continuously deployed: the backend on Railway, the frontend on Vercel.",
  'siteAbout.repoLink': 'View the source code on GitHub',
  'siteAbout.placeholder': 'Architecture diagram coming soon',

  'skills.label': 'TECHNICAL SKILLS',
  'skills.title': 'My stack',
  'skill.cybersecurite': 'Cybersecurity (in training, RS7394)',
  'skill.frontend': 'Frontend',
  'skill.backend': 'Backend',
  'skill.base_de_donnees': 'Databases',
  'skill.lowcode': 'Low-Code',
  'skill.outils': 'Tools',
  'skill.methodologies': 'Methodologies',

  'experience.label': 'PROFESSIONAL BACKGROUND',
  'experience.learnMore': 'Learn more about this role →',
  'experience.title': 'Experience',
  'education.title': "Master's degree (MIAGE) – Honors",
  'education.school': 'University of Orléans – UFR Sciences & Techniques',
  'education.badge': 'Education',
  'education.period': '2022 – 2025',
  'education.location': 'Orléans, France',
  'education.mission1': 'Applied Computer Methods for Business Management',
  'education.mission2': 'Work-study program: web development, project management, information systems',

  'cyberFormation.title': 'Cybersecurity Specialist — RS7394 Certification',
  'cyberFormation.school': 'M2i / Skolae, Orléans, France',
  'cyberFormation.badge': 'Training (in progress)',
  'cyberFormation.period': '2026 – 2027',
  'cyberFormation.location': 'Orléans, France',
  'cyberFormation.mission1': 'Preparing for the RS7394 certification — Penetration testing (Pentesting)',
  'cyberFormation.mission2': 'Foundations currently being acquired: networking (OSI, TCP/IP), Linux & Windows systems, penetration testing methodology, Python, system hardening, EBIOS RM risk analysis, SOC/SIEM basics (Splunk)',
  'cyberFormation.mission3': 'TryHackMe — Pre Security path in progress',

  'projects.label': 'FEATURED PROJECTS',
  'projects.title': 'Some of my projects',
  'projects.viewProject': 'View project →',

  'damageDetector.label': 'OUTSIDE ANGULAR',
  'damageDetector.title': 'A bit of React and Node.js',
  'damageDetector.text': "To step outside the Angular/Spring Boot ecosystem used elsewhere in this portfolio, I built this project with a different stack: React on the frontend, Node.js/Express on the backend. The app uses AI to analyze a photo, detect the visible objects, and estimate the damage, loss and price of the items involved — a use case aimed particularly at the insurance industry, where it can speed up and improve the reliability of claims assessment.",
  'damageDetector.cta': 'View project',

  'labs.label': 'CYBERSECURITY TRAINING',
  'labs.title': 'Labs & Write-ups',
  'labs.intro': "My progress through the RS7394 training, documented as I go: TryHackMe rooms, HackTheBox/Root-Me machines, CTFs and M2i coursework. Each write-up details the methodology followed, not just the result.",
  'labs.linkedinLearning': 'View my LinkedIn Learning certificates',
  'labs.tryhackmeProfile': 'View my TryHackMe profile →',
  'labs.viewWriteup': 'View write-up →',
  'labs.emptyTitle': 'First write-ups in progress',
  'labs.emptyText': "This section fills up as I progress through training (TryHackMe, HackTheBox, Root-Me, CTFs, M2i coursework) — check back soon, or follow my progress live via my TryHackMe profile above.",

  'secCase.label': 'CASE STUDY',
  'secCase.title': 'Securing my portfolio',
  'secCase.intro': "Beyond the application code, I applied a real DevSecOps approach to this site itself — to concretely demonstrate the measures I intend to apply during an AppSec/DevSecOps internship. Here's what was put in place, why, and what it revealed.",
  'secCase.headers.title': 'HTTP security headers',
  'secCase.headers.text': "By default, a website tells the browser nothing about its own security rules. I added a strict Content-Security-Policy (explicitly listed script/style/font sources), plus HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy, on both of the site's domains (portfolio and damage detector).",
  'secCase.headers.before': 'Before (securityheaders.com)',
  'secCase.headers.after': 'After',
  'secCase.api.title': 'Hardening the AI API',
  'secCase.api.text': "The site's conversational assistant calls Anthropic's Claude API, which has a real cost per request. It's the most sensitive part of the backend — and where I found the most concrete issue of this whole effort.",
  'secCase.api.findingTitle': 'Real finding: fully open CORS on the AI endpoint',
  'secCase.api.findingText': 'The chat controller had an @CrossOrigin(origins = "*") annotation that bypassed the global CORS configuration, even though it was correctly restricted elsewhere. Any website could have embedded JavaScript consuming my AI quota at my expense. Verified with a request simulating a malicious origin: 200 OK before the fix, 403 after.',
  'secCase.api.measure1': 'Removed the CORS wildcard: the endpoint now respects the global origin restriction',
  'secCase.api.measure2': 'Rate limiting: 10 requests per minute per IP',
  'secCase.api.measure3': 'Maximum user message length (1000 characters) and output token cap (1024)',
  'secCase.api.measure4': 'Basic (non-blocking) detection of prompt injection attempts, for monitoring purposes',
  'secCase.cicd.title': 'Security built into CI/CD',
  'secCase.cicd.text': 'Rather than checking security on an ad-hoc basis, these checks run automatically on every push, alongside the tests.',
  'secCase.cicd.gitleaks': 'Scans the entire Git history for committed secrets',
  'secCase.cicd.dependabot': 'Automatic updates for vulnerable dependencies',
  'secCase.cicd.npmAudit': 'Known vulnerabilities in npm dependencies (3 projects)',
  'secCase.cicd.dependencyCheck': 'Known vulnerabilities on the Java/Maven side (NVD database)',
  'secCase.cicd.trivy': 'Dependency scanning and Dockerfile best-practice checks',
  'secCase.cicd.codeql': 'Static code analysis (SAST) for JavaScript/TypeScript and Java',
  'secCase.story.title': 'What I took away from this',
  'secCase.story.text': "During this work, I had a real API key in plain text in a local config file for a test — never committed, caught before any commit thanks to systematically reviewing the diff before every \"git add\". It confirmed the value of good habits from training: environment variables only, never a hardcoded secret, and checking the content before pushing anything.",
  'secCase.story.lesson1': 'Always review git status/git diff before committing, even under time pressure',
  'secCase.story.lesson2': 'Centralize secrets as environment variables from day one, not as an afterthought',
  'secCase.story.lesson3': 'Add gitleaks in CI as an extra safety net, not as the only line of defense',

  'devops.label': 'BEHIND THE SCENES',
  'devops.title': 'From Git to production',
  'devops.intro': "This portfolio has also been a chance to put in place the beginnings of a DevOps practice: Docker to faithfully reproduce the environment the app will run in, and GitHub Actions to automatically test and verify every deployment before it reaches production.",
  'devops.git.title': 'Versioning',
  'devops.git.desc': 'A Git monorepo (Angular frontend + Spring Boot backend) versioned on GitHub.',
  'devops.ci.title': 'Continuous Integration',
  'devops.ci.desc': 'On every push, GitHub Actions automatically builds and tests both applications.',
  'devops.docker.title': 'Containerization',
  'devops.docker.desc': 'Each service is packaged into a Docker image via a multi-stage build.',
  'devops.deploy.title': 'Continuous Deployment',
  'devops.deploy.desc': 'The backend is deployed on Railway and the frontend on Vercel, automatically on every change to main.',
  'devops.deploy.caption': "Both services redeploy automatically from the same commit. Secrets (like the Anthropic API key) are stored as an environment variable on Railway, never in the code.",
  'devops.placeholder': 'Screenshot coming soon',
  'devops.caseStudyLink': 'Read the full case study: securing this portfolio →',

  'footer.copyright': '© 2026 Kong-Meng Yang',

  'detail.back': 'Back to portfolio',
  'detail.viewGithub': 'View on GitHub',
  'detail.viewSite': 'View site →',
  'detail.privateBadge': '🔒 Private code repository',
  'detail.confidentialBadge': '🔒 Confidential – built in a professional environment',
  'detail.roleContext': 'Role & context',
  'detail.roleLabel': 'Role:',
  'detail.contextLabel': 'Context:',
  'detail.about': 'About this project',
  'detail.results': 'Results & impact',
  'detail.technologies': 'Technologies used',
  'detail.screenshots': 'Screenshots',
  'detail.privateTitle': 'Private code repository',
  'detail.privateText': "This project was built as a group during my studies. The code repository is private, but I'm happy to talk through it in detail on request.",
  'detail.confidentialTitle': 'Built in a professional environment',
  'detail.confidentialText': "This project was developed in a professional environment. Screenshots and sensitive details were intentionally omitted to respect confidentiality.",
  'detail.notFound': 'Project not found',
  'detail.backButton': 'Back',
  'detail.loadError': 'Unable to load projects',
  'detail.loadErrorText': "The server isn't responding (check that it's running and reachable).",
};

const DICT: Record<Lang, Dict> = { fr: FR, en: EN };

@Injectable({ providedIn: 'root' })
export class I18nService {
  private router = inject(Router);

  lang = signal<Lang>('fr');

  /** Detects the language to use on first visit: stored preference, else browser language. */
  detect(): Lang {
    try {
      const stored = localStorage.getItem('lang');
      if (stored === 'fr' || stored === 'en') return stored;
    } catch {}
    const nav = (typeof navigator !== 'undefined' ? navigator.language : '') || '';
    return nav.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  /** Syncs the signal from a route param without navigating (called on route activation). */
  sync(langParam: string | null): void {
    const resolved: Lang = langParam === 'en' ? 'en' : 'fr';
    if (this.lang() !== resolved) {
      this.lang.set(resolved);
    }
    try { localStorage.setItem('lang', resolved); } catch {}
  }

  /** Switches language and navigates to the equivalent URL under the new lang prefix. */
  switchTo(newLang: Lang): void {
    if (newLang === this.lang()) return;
    this.lang.set(newLang);
    try { localStorage.setItem('lang', newLang); } catch {}
    const rest = this.router.url.replace(/^\/(fr|en)/, '');
    this.router.navigateByUrl(`/${newLang}${rest}`);
  }

  t(key: string): string {
    return DICT[this.lang()][key] ?? key;
  }
}
