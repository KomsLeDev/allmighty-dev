import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Projet } from '../../services/portfolio';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section section-alt" id="projets">
      <div class="container">
        <h2 class="section-title">Projets</h2>

        <!-- FILTRES -->
        <div class="filters">
          <button
            *ngFor="let f of filtres"
            [class.active]="filtreActif === f"
            (click)="filtrer(f)">
            {{ f }}
          </button>
        </div>

        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div *ngIf="!loading && !error" class="projets-grid">
          <div class="projet-card" *ngFor="let p of projetsFiltres; let i = index">

            <!-- IMAGE / PLACEHOLDER -->
            <div class="projet-img">
              <ng-container *ngIf="p.image_url; else placeholder">
                <img [src]="p.image_url" [alt]="p.titre" />
              </ng-container>
              <ng-template #placeholder>
                <div class="placeholder-img">
                  <span class="placeholder-icon">{{ getCategorieIcon(p.categorie) }}</span>
                  <span class="placeholder-text">Capture à venir</span>
                </div>
              </ng-template>
              <span class="categorie-badge">{{ p.categorie }}</span>
            </div>

            <!-- CONTENU -->
            <div class="projet-content">
              <div class="projet-num">0{{ i + 1 }}</div>
              <h3>{{ p.titre }}</h3>
              <p class="projet-contexte">{{ p.contexte }}</p>
              <p class="projet-desc">{{ p.description }}</p>
              <div class="projet-stack">
                <span class="tag" *ngFor="let tech of p.technologiesArray">{{ tech }}</span>
              </div>
              <div class="projet-links" *ngIf="p.lien_github || p.lien_demo">
                <a *ngIf="p.lien_github" [href]="p.lien_github" target="_blank" class="btn-sm">GitHub</a>
                <a *ngIf="p.lien_demo"   [href]="p.lien_demo"   target="_blank" class="btn-sm btn-accent">Démo</a>
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
      margin-bottom: 2rem;
    }
    .section-title::after {
      content: '';
      display: block;
      width: 40px; height: 3px;
      background: #00d4ff;
      margin-top: 0.5rem;
    }
    .filters {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
    .filters button {
      padding: 0.5rem 1.25rem;
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 999px;
      color: #64748b;
      font-family: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .filters button:hover,
    .filters button.active {
      border-color: #00d4ff;
      color: #00d4ff;
      background: rgba(0,212,255,0.08);
    }
    .loading { display: flex; justify-content: center; padding: 4rem; }
    .spinner {
      width: 40px; height: 40px;
      border: 2px solid #1f2d3d;
      border-top-color: #00d4ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .projets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
      gap: 2rem;
    }
    .projet-card {
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.3s, transform 0.3s;
    }
    .projet-card:hover { border-color: #00d4ff; transform: translateY(-6px); }
    .projet-img { position: relative; height: 220px; overflow: hidden; }
    .projet-img img { width: 100%; height: 100%; object-fit: cover; }
    .placeholder-img {
      width: 100%; height: 100%;
      background: #1a2232;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
    .placeholder-icon { font-size: 3rem; }
    .placeholder-text {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: #64748b;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .categorie-badge {
      position: absolute;
      top: 1rem; right: 1rem;
      padding: 0.3rem 0.75rem;
      background: rgba(0,212,255,0.15);
      border: 1px solid rgba(0,212,255,0.4);
      border-radius: 999px;
      font-size: 0.72rem;
      color: #00d4ff;
      font-family: 'Space Mono', monospace;
      letter-spacing: 0.05em;
    }
    .projet-content { padding: 1.75rem; }
    .projet-num {
      font-family: 'Space Mono', monospace;
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a2232;
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    .projet-card:hover .projet-num { color: rgba(0,212,255,0.15); }
    h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; }
    .projet-contexte {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      color: #00d4ff;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }
    .projet-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.25rem; }
    .projet-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
    .tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.7rem;
      padding: 0.25rem 0.65rem;
      background: #1a2232;
      border: 1px solid #1f2d3d;
      border-radius: 4px;
      color: #94a3b8;
    }
    .projet-links { display: flex; gap: 0.75rem; }
    .btn-sm {
      padding: 0.5rem 1rem;
      border: 1px solid #1f2d3d;
      border-radius: 8px;
      font-size: 0.82rem;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.3s;
    }
    .btn-sm:hover { border-color: #00d4ff; color: #00d4ff; }
    .btn-sm.btn-accent { background: #00d4ff; color: #080c10; border-color: #00d4ff; font-weight: 700; }
    .btn-sm.btn-accent:hover { box-shadow: 0 4px 20px rgba(0,212,255,0.3); }
    @media (max-width: 768px) { .projets-grid { grid-template-columns: 1fr; } }
  `]
})
export class ProjetsComponent implements OnInit {
  projets:        Projet[] = [];
  projetsFiltres: Projet[] = [];
  filtreActif = 'Tous';
  filtres     = ['Tous', 'Power Platform', 'Fullstack'];
  loading = true;
  error   = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProjets().subscribe({
      next: (res) => {
        this.projets        = res.data;
        this.projetsFiltres = res.data;
        this.loading        = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      }
    });
  }

  filtrer(f: string) {
    this.filtreActif    = f;
    this.projetsFiltres = f === 'Tous'
      ? this.projets
      : this.projets.filter(p => p.categorie === f);
  }

  getCategorieIcon(cat: string): string {
    const icons: Record<string, string> = {
      'Power Platform': '⚡',
      'Fullstack':      '🖥️',
    };
    return icons[cat] ?? '📁';
  }
}