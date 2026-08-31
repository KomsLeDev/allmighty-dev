import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio';
import { I18nService, Lang } from '../services/i18n';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail implements OnInit {
  project = signal<any>(null);
  notFound = signal(false);
  loadError = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.i18n.sync(params.get('lang'));
      const id = params.get('id');
      this.loadProject(id);
    });
  }

  loadProject(id: string | null): void {
    this.project.set(null);
    this.notFound.set(false);
    this.loadError.set(false);

    this.portfolioService.getProjects().subscribe({
      next: (data: any) => {
        const projects = data as any[];
        const found = projects.find((p: any) => p.id === id);
        this.project.set(found ?? null);
        this.notFound.set(!found);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets :', err);
        this.loadError.set(true);
      }
    });
  }

  switchLang(lang: Lang): void {
    this.i18n.switchTo(lang);
  }

  goBack(): void {
    this.router.navigate(['/', this.i18n.lang()]);
  }
}
