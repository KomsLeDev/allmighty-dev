# 🧑‍💻 Yang Kong-Meng — Portfolio

> Portfolio personnel développé en **Angular + PHP + MySQL**, déployé sur **Vercel** (frontend) et **Alwaysdata** (backend).

🌐 **Site en ligne** : [allmighty-dev.fr](https://allmighty-dev.fr)  
💼 **LinkedIn** : [linkedin.com/in/kong-mengyang](https://www.linkedin.com/in/kong-mengyang)  
🐙 **GitHub** : [github.com/KomsLeDev](https://github.com/KomsLeDev)

---

## 👤 À propos

Développeur web diplômé d'un **Master MIAGE** (mention assez bien) à l'Université d'Orléans.  
Expérience en développement d'applications métier lors de deux alternances chez **SNCF** et à la **CARSAT Centre-Val de Loire**.  
À la recherche d'un poste en développement web (CDI/CDD).

---

## 🏗️ Architecture du projet

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│              Angular 21 — Vercel                        │
│                                                         │
│  NavbarComponent   HeroComponent   AboutComponent       │
│  CompetencesComponent   ExperiencesComponent            │
│  ProjetsComponent   FooterComponent                     │
│                                                         │
│         PortfolioService (HttpClient)                   │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP REST (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                            │
│              PHP 8 — Alwaysdata                         │
│                                                         │
│  /api/competences.php                                   │
│  /api/experiences.php                                   │
│  /api/projets.php                                       │
│                                                         │
│  PDO + MySQL — Headers CORS + Sécurité                  │
└────────────────────┬────────────────────────────────────┘
                     │ PDO
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   BASE DE DONNÉES                       │
│              MySQL 11 — Alwaysdata                      │
│                                                         │
│  competences   experiences   projets   tags_experience  │
└─────────────────────────────────────────────────────────┘
```

---

## 🗄️ Modèle de la base de données (MCD)

```
┌──────────────────┐       ┌──────────────────────┐
│   experiences    │       │   tags_experience    │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │──────<│ id (PK)              │
│ poste            │       │ experience_id (FK)   │
│ entreprise       │       │ tag                  │
│ lieu             │       └──────────────────────┘
│ date_debut       │
│ date_fin         │
│ description      │
│ type             │
│ ordre            │
└──────────────────┘

┌──────────────────┐       ┌──────────────────────┐
│   competences    │       │       projets        │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │       │ id (PK)              │
│ categorie        │       │ titre                │
│ nom              │       │ categorie            │
│ niveau (0-100)   │       │ description          │
│ icone            │       │ contexte             │
│ est_phare        │       │ technologies         │
│ ordre            │       │ image_url            │
└──────────────────┘       │ lien_github          │
                           │ lien_demo            │
                           │ est_featured         │
                           │ ordre                │
                           └──────────────────────┘
```

---

## 🛠️ Stack technique

### Frontend
| Technologie | Usage |
|-------------|-------|
| Angular 21 | Framework principal, composants standalone |
| TypeScript | Typage statique |
| RxJS | Gestion des appels HTTP asynchrones |
| CSS (inline styles) | Styles scopés par composant |

### Backend
| Technologie | Usage |
|-------------|-------|
| PHP 8 | API REST — 3 endpoints GET |
| PDO | Connexion sécurisée à MySQL |
| MySQL 11 (MariaDB) | Stockage des données |
| CORS Headers | Communication cross-origin frontend/backend |

### Déploiement
| Service | Usage |
|---------|-------|
| Vercel | Hébergement frontend — CI/CD automatique via GitHub |
| Alwaysdata | Hébergement backend PHP + MySQL |
| GitHub | Versioning — déploiement déclenché au push |

---

## 📁 Structure du projet

```
portfolio-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── competences/
│   │   │   ├── experiences/
│   │   │   ├── projets/
│   │   │   └── footer/
│   │   ├── services/
│   │   │   └── portfolio.service.ts
│   │   ├── app.ts
│   │   └── app.config.ts
│   ├── styles.css
│   └── index.html
├── vercel.json
└── package.json
```

---

## 🚀 Lancer le projet en local

```bash
# Cloner le repo
git clone https://github.com/KomsLeDev/allmighty-dev.git
cd allmighty-dev

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve

# Ouvrir http://localhost:4200
```

---

## 📬 Contact

- ✉️ komsyang@gmail.com
- 📞 06 51 64 80 27
- 📍 Orléans, Centre-Val de Loire