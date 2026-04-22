import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../../services/portfolio';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="experiences">
      <div class="container">
        <h2 class="section-title">Expériences</h2>

        <div *ngIf="loading" class="loading">
          <div class="spinner"></div>
        </div>

        <div *ngIf="!loading && !error">
          <!-- EMPLOIS -->
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of emplois">
              <div class="timeline-dot"></div>
              <div class="timeline-date">{{ exp.date_debut }} — {{ exp.date_fin }}</div>
              <div class="timeline-card">
                <div class="tc-header">
                  <div>
                    <h3>{{ exp.poste }}</h3>
                    <p class="tc-company">{{ exp.entreprise }} · {{ exp.lieu }}</p>
                  </div>
                  <div class="tc-tags">
                    <span class="tag" *ngFor="let tag of exp.tags">{{ tag }}</span>
                  </div>
                </div>
                <p class="tc-desc">{{ exp.description }}</p>
              </div>
            </div>
          </div>

          <!-- FORMATIONS -->
          <h2 class="section-title" style="margin-top:5rem">Formation</h2>
          <div class="edu-grid">
            <div class="edu-card" *ngFor="let f of formations">
              <span class="edu-year">{{ f.date_debut }}{{ f.date_fin !== f.date_debut ? ' – ' + f.date_fin : '' }}</span>
              <h3>{{ f.poste }}</h3>
              <p class="edu-school">{{ f.entreprise }}</p>
              <p class="edu-desc">{{ f.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 7rem 0; }
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
    .loading { display: flex; justify-content: center; padding: 4rem; }
    .spinner {
      width: 40px; height: 40px;
      border: 2px solid #1f2d3d;
      border-top-color: #00d4ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .timeline { position: relative; padding-left: 2.5rem; }
    .timeline::before {
      content: '';
      position: absolute;
      left: 8px; top: 0; bottom: 0;
      width: 1px;
      background: #1f2d3d;
    }
    .timeline-item { position: relative; margin-bottom: 3rem; }
    .timeline-dot {
      position: absolute;
      left: -2.5rem; top: 0.4rem;
      width: 16px; height: 16px;
      border-radius: 50%;
      background: #080c10;
      border: 2px solid #00d4ff;
      box-shadow: 0 0 12px rgba(0,212,255,0.4);
    }
    .timeline-date {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      color: #00d4ff;
      letter-spacing: 0.08em;
      margin-bottom: 0.75rem;
    }
    .timeline-card {
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 12px;
      padding: 1.75rem;
      transition: border-color 0.3s;
    }
    .timeline-card:hover { border-color: #00d4ff; }
    .tc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .tc-header h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem; }
    .tc-company { color: #00d4ff; font-size: 0.9rem; font-family: 'Space Mono', monospace; }
    .tc-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      padding: 0.25rem 0.65rem;
      background: rgba(0,212,255,0.08);
      border: 1px solid rgba(0,212,255,0.3);
      border-radius: 4px;
      color: #00d4ff;
    }
    .tc-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.7; }
    .edu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.25rem;
    }
    .edu-card {
      background: #111820;
      border: 1px solid #1f2d3d;
      border-radius: 12px;
      padding: 1.5rem;
      transition: border-color 0.3s, transform 0.3s;
    }
    .edu-card:hover { border-color: #7c3aed; transform: translateY(-3px); }
    .edu-year {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      color: #00d4ff;
      letter-spacing: 0.08em;
      margin-bottom: 0.5rem;
      display: block;
    }
    .edu-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
    .edu-school { color: #64748b; font-size: 0.85rem; margin-bottom: 0.25rem; }
    .edu-desc { color: #94a3b8; font-size: 0.8rem; }
  `]
})
export class ExperiencesComponent implements OnInit {
  emplois:    Experience[] = [];
  formations: Experience[] = [];
  loading = true;
  error   = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getExperiences().subscribe({
      next: (res) => {
        this.emplois    = res.emplois;
        this.formations = res.formations;
        this.loading    = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      }
    });
  }
}