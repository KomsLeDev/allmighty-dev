# Portfolio IA — allmighty-dev.fr

Portfolio personnel de développeur web fullstack, intégrant un assistant IA capable de répondre aux questions des recruteurs sur mon parcours, mes compétences et mes projets.

🔗 **Site en ligne :** [allmighty-dev.fr](https://allmighty-dev.fr)

---

## 🧠 Concept

Plutôt qu'un portfolio statique classique, ce projet propose une expérience interactive : un assistant IA alimenté par **Claude (Anthropic)** répond en temps réel aux questions des visiteurs en se basant exclusivement sur mon parcours réel (expériences, compétences, projets, formation).

---

## 🏗️ Architecture

```
allmighty-dev/
├── frontend/
│   └── portfolio-ai/        → Application Angular 21
└── backend/
    └── demo/                 → API Spring Boot
```

Le projet suit une architecture **client-serveur découplée** :

```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│   Frontend       │  HTTP   │   Backend             │  HTTPS  │  Anthropic API   │
│   Angular 21      │ ──────► │   Spring Boot 4        │ ──────► │  (Claude Haiku)   │
│   (Vercel)        │ ◄────── │   (Railway)            │ ◄────── │                   │
└─────────────────┘         └──────────────────────┘         └─────────────────┘
```

La clé API Anthropic n'est **jamais exposée côté client** — toutes les requêtes passent par le backend Spring Boot qui joue le rôle de proxy sécurisé.

---

## 🎨 Frontend — Angular 21

**Stack :** Angular 21 (standalone components), TypeScript, RxJS, CSS natif (pas de framework UI).

**Structure :**
- `app.ts` / `app.html` / `app.css` — page principale (hero, chat, compétences, expériences, projets)
- `project-detail/` — pages dédiées détaillant chaque projet individuellement
- `services/portfolio.ts` — service HTTP centralisant les appels au backend
- `shell.ts` — composant racine gérant le routing (`<router-outlet>`)

**Fonctionnalités notables :**
- Chat IA avec effet de frappe caractère par caractère (streaming simulé)
- Robot animé avec 3 expressions contextuelles (idle / thinking / talking)
- Routing Angular avec lazy loading pour les pages projet
- Design responsive (mobile / tablette / desktop)

**Déploiement :** [Vercel](https://vercel.com), build automatique à chaque push sur `main`.

---

## ⚙️ Backend — Spring Boot 4

**Stack :** Java 21, Spring Boot 4, Spring Web, Jackson (JSON), HttpClient natif Java.

**Structure :**
```
src/main/java/com/komsy/analyzer/
├── controller/
│   ├── ChatController.java        → endpoint /api/chat
│   ├── ProfileController.java     → endpoint /api/profile
│   ├── ProjectController.java     → endpoint /api/projects
│   ├── SkillsController.java      → endpoint /api/skills
│   └── ExperiencesController.java → endpoint /api/experiences
├── service/
│   ├── ChatService.java           → logique d'appel à l'API Anthropic
│   └── PortfolioDataService.java  → construction du system prompt
└── resources/
    └── data/
        ├── profile.json
        ├── experiences.json
        ├── skills.json
        └── projects.json
```

**Comment fonctionne le chat IA :**

1. Le visiteur pose une question via le frontend
2. `ChatController` reçoit la requête et la transmet à `ChatService`
3. `PortfolioDataService` construit un **system prompt** dynamique à partir des fichiers JSON (profil, expériences, compétences, projets)
4. `ChatService` envoie une requête HTTP à l'API Anthropic (`https://api.anthropic.com/v1/messages`) avec ce contexte
5. Claude Haiku génère une réponse basée **uniquement** sur les informations fournies — il ne peut pas inventer d'informations hors contexte
6. La réponse est retournée au frontend et affichée avec un effet de frappe

**Modèle utilisé :** `claude-haiku-4-5` — choisi pour son excellent rapport qualité/prix sur ce cas d'usage (questions courtes, contexte limité).

**Déploiement :** [Railway](https://railway.app), build automatique à chaque push sur `main`.

---

## 🔐 Sécurité

- La clé API Anthropic n'est **jamais committée** dans le code — elle est injectée via la variable d'environnement `ANTHROPIC_API_KEY`, configurée directement dans les paramètres du service Railway
- `application.properties` référence la clé via `${ANTHROPIC_API_KEY}`, jamais en clair
- Un plafond de dépense mensuel est configuré sur la Console Anthropic pour limiter les risques d'abus

---

## 📦 Données du portfolio

Toutes les informations utilisées par l'IA et affichées sur le site (expériences, compétences, projets) sont centralisées dans des fichiers JSON statiques côté backend (`src/main/resources/data/`). Cette approche permet de :
- Garder une source unique de vérité entre l'affichage du site et le contexte de l'IA
- Mettre à jour le contenu sans toucher au code (front ou back)

---

## 🚀 Lancer le projet en local

### Backend
```bash
cd backend/demo
$env:ANTHROPIC_API_KEY="ta-cle-api"
.\mvnw spring-boot:run
```
API disponible sur `http://localhost:8080`

### Frontend
```bash
cd frontend/portfolio-ai
npm install
ng serve
```
Site disponible sur `http://localhost:4200`

---

## 🛠️ Stack technique complète

| Catégorie | Technologies |
|---|---|
| Frontend | Angular 21, TypeScript, RxJS |
| Backend | Java 21, Spring Boot 4 |
| IA | Claude Haiku 4.5 (API Anthropic) |
| Hébergement frontend | Vercel |
| Hébergement backend | Railway |
| Versioning | Git / GitHub |

---

## 👤 Auteur

**Kong-Meng Yang** — Développeur web fullstack, diplômé d'un Master MIAGE (Université d'Orléans)

- Portfolio : [allmighty-dev.fr](https://allmighty-dev.fr)
- GitHub : [@KomsLeDev](https://github.com/KomsLeDev)
