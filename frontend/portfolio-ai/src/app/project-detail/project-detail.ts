import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio';
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
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}