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
  'nav.github': 'GITHUB',

  'hero.availability': 'DISPONIBLE · DÉVELOPPEUR WEB FULLSTACK',
  'hero.subtitle': 'Diplômé Master MIAGE · Orléans',
  'hero.specialityPrefix': 'Spécialisé en',
  'hero.specialityAnd': '&',
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
  'siteAbout.text': "Ce site est une application complète, pensée comme un vrai produit plutôt qu'une simple vitrine statique. Le frontend est développé en Angular 21 et communique avec une API REST Spring Boot qui expose mon profil, mes compétences, mes expériences et mes projets. Il intègre un assistant conversationnel propulsé par l'API Claude d'Anthropic, capable de répondre en direct aux questions sur mon parcours, et il est entièrement bilingue français/anglais. Côté infrastructure, les deux applications sont conteneurisées avec Docker, testées et validées automatiquement à chaque push grâce à une pipeline d'intégration continue GitHub Actions, puis déployées en continu : le backend sur Railway, le frontend sur Vercel.",
  'siteAbout.placeholder': "Schéma d'architecture à venir",

  'skills.label': 'COMPÉTENCES TECHNIQUES',
  'skills.title': 'Mon stack',
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

  'projects.label': 'PROJETS RÉALISÉS',
  'projects.title': 'Quelques projets',

  'devops.label': 'COULISSES TECHNIQUES',
  'devops.title': 'De Git à la production',
  'devops.intro': "Ce portfolio n'est pas juste une vitrine : c'est aussi un vrai projet DevOps. Voici comment le code passe de mon poste à la production.",
  'devops.git.title': 'Versioning',
  'devops.git.desc': 'Un monorepo Git (frontend Angular + backend Spring Boot) versionné sur GitHub.',
  'devops.ci.title': 'Intégration continue',
  'devops.ci.desc': "À chaque push, GitHub Actions build et teste automatiquement les deux applications.",
  'devops.docker.title': 'Conteneurisation',
  'devops.docker.desc': "Chaque service est packagé dans une image Docker via un build multi-stage.",
  'devops.deploy.title': 'Déploiement continu',
  'devops.deploy.desc': 'Le backend est déployé sur Railway et le frontend sur Vercel, automatiquement à chaque changement sur main.',
  'devops.placeholder': 'Illustration à venir',

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
  'nav.github': 'GITHUB',

  'hero.availability': 'AVAILABLE · FULLSTACK WEB DEVELOPER',
  'hero.subtitle': "Master's degree (MIAGE) · Orléans, France",
  'hero.specialityPrefix': 'Specialized in',
  'hero.specialityAnd': '&',
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
  'siteAbout.text': "This site is a full application, built like a real product rather than a static showcase. The frontend is built with Angular 21 and talks to a Spring Boot REST API exposing my profile, skills, experience and projects. It includes a conversational assistant powered by Anthropic's Claude API, able to answer questions about my background live, and the whole site is fully bilingual (French/English). On the infrastructure side, both applications are containerized with Docker, automatically built and tested on every push through a GitHub Actions CI pipeline, then continuously deployed: the backend on Railway, the frontend on Vercel.",
  'siteAbout.placeholder': 'Architecture diagram coming soon',

  'skills.label': 'TECHNICAL SKILLS',
  'skills.title': 'My stack',
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

  'projects.label': 'FEATURED PROJECTS',
  'projects.title': 'Some of my projects',

  'devops.label': 'BEHIND THE SCENES',
  'devops.title': 'From Git to production',
  'devops.intro': "This portfolio isn't just a showcase — it's also a real DevOps project. Here's how the code goes from my machine to production.",
  'devops.git.title': 'Versioning',
  'devops.git.desc': 'A Git monorepo (Angular frontend + Spring Boot backend) versioned on GitHub.',
  'devops.ci.title': 'Continuous Integration',
  'devops.ci.desc': 'On every push, GitHub Actions automatically builds and tests both applications.',
  'devops.docker.title': 'Containerization',
  'devops.docker.desc': 'Each service is packaged into a Docker image via a multi-stage build.',
  'devops.deploy.title': 'Continuous Deployment',
  'devops.deploy.desc': 'The backend is deployed on Railway and the frontend on Vercel, automatically on every change to main.',
  'devops.placeholder': 'Screenshot coming soon',

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
