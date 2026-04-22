import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="section" id="about">
      <div class="container about-grid">
        <div class="about-text">
          <h2 class="section-title">À propos</h2>
          <p>
            Développeur web diplômé d'un <strong>Master MIAGE</strong> (mention assez bien)
            à l'Université d'Orléans, j'ai forgé mon expérience lors de deux alternances
            chez <strong>SNCF</strong> et à la <strong>CARSAT Centre-Val de Loire</strong>.
          </p>
          <p>
            Sérieux, organisé et autonome, je m'investis dans chaque mission avec rigueur.
            J'apprécie le travail en équipe et cherche constamment à progresser techniquement.
            Actuellement en recherche d'un poste en développement web.
          </p>
          <div class="about-infos">
            <div class="info-item"><span class="icon">📍</span><span>Orléans, Centre-Val de Loire</span></div>
            <div class="info-item"><span class="icon">🎓</span><span>Master MIAGE — Mention assez bien</span></div>
            <div class="info-item"><span class="icon">🚗</span><span>Permis B — Véhiculé</span></div>
            <div class="info-item"><span class="icon">🌐</span><span>Anglais technique</span></div>
          </div>
        </div>
        <div class="about-stats">
          <div class="stat-card" *ngFor="let stat of stats">
            <span class="stat-num">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 7rem 0; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 2rem;
    }
    .section-title::after {
      content: '';
      display: block;
      width: 40px; height: 3px;
      background: #00d4ff;
      margin-top: 0.5rem;
    }
    p { color: #94a3b8; margin-bottom: 1.2rem; font-size: 1.05rem; line-height: 1.7; }
    strong { color: #0f172a; font-weight: 600; }
    .about-infos { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; }
    .info-item { display: flex; align-items: center; gap: 0.75rem; color: #94a3b8; font-size: 0.95rem; }
    .icon { font-size: 1.1rem; }
    .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .stat-card {
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      text-align: center;
      transition: border-color 0.3s, transform 0.3s;
    }
    .stat-card:hover { border-color: #00d4ff; transform: translateY(-4px); }
    .stat-num { display: block; font-size: 3rem; font-weight: 800; color: #00d4ff; font-family: 'Space Mono', monospace; line-height: 1; }
    .stat-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.5rem; display: block; }
    @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }
  `]
})
export class AboutComponent {
  stats = [
    { value: '2+', label: 'ans d\'alternance' },
    { value: '10+', label: 'technos maîtrisées' },
    { value: '4',  label: 'projets réalisés' },
    { value: '5',  label: 'années de formation' },
  ];
}