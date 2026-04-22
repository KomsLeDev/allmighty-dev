import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, CategorieCompetence } from '../../services/portfolio';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section section-alt" id="competences">
      <div class="container">
        <h2 class="section-title">Compétences</h2>

        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
          <p>Chargement des compétences…</p>
        </div>

        <div *ngIf="error" class="error-msg">
          ⚠️ Impossible de charger les compétences.
        </div>

        <div *ngIf="!loading && !error" class="skills-grid">
          <div class="skill-card" *ngFor="let cat of categories">
            <h3 class="cat-title">{{ cat.categorie }}</h3>
            <div class="skill-items">
              <div class="skill-item" *ngFor="let item of cat.items">
                <div class="skill-header">
                  <span class="skill-icon">{{ item.icone }}</span>
                  <span class="skill-name" [class.phare]="item.estPhare">{{ item.nom }}</span>
                  <span class="skill-pct">{{ item.niveau }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-fill" [style.width.%]="item.niveau" [class.phare]="item.estPhare"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 7rem 0; }
    .section-alt { background: #0d1117; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 3rem;
    }
    .section-title::after {
      content: '';
      display: block;
      width: 40px; height: 3px;
      background: #00d4ff;
      margin-top: 0.5rem;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 4rem;
      color: #64748b;
    }
    .spinner {
      width: 40px; height: 40px;
      border: 2px solid #1f2d3d;
      border-top-color: #00d4ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .error-msg {
      text-align: center;
      color: #ff5050;
      padding: 2rem;
      background: rgba(255,80,80,0.05);
      border: 1px solid rgba(255,80,80,0.2);
      border-radius: 12px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .skill-card {
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 12px;
      padding: 1.75rem;
      transition: border-color 0.3s, transform 0.3s;
    }
    .skill-card:hover { border-color: #00d4ff; transform: translateY(-4px); }
    .cat-title {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #00d4ff;
      margin-bottom: 1.25rem;
      font-family: 'Space Mono', monospace;
    }
    .skill-items { display: flex; flex-direction: column; gap: 1rem; }
    .skill-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }
    .skill-icon { font-size: 1rem; }
    .skill-name { flex: 1; font-size: 0.9rem; color: #94a3b8; }
    .skill-name.phare { color: #e2e8f0; font-weight: 600; }
    .skill-pct {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: #64748b;
    }
    .skill-bar {
      height: 4px;
      background: #1a2232;
      border-radius: 2px;
      overflow: hidden;
    }
    .skill-fill {
      height: 100%;
      background: #1f2d3d;
      border-radius: 2px;
      transition: width 1s ease;
    }
    .skill-fill.phare { background: linear-gradient(to right, #00d4ff, #7c3aed); }
    @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr; } }
  `]
})
export class CompetencesComponent implements OnInit {
  categories: CategorieCompetence[] = [];
  loading = true;
  error   = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getCompetences().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loading    = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      }
    });
  }
}