import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then(m => m.App)
  },
  {
    path: 'projet/:id',
    loadComponent: () => import('./project-detail/project-detail').then(m => m.ProjectDetail)
  },
  { path: '**', redirectTo: '' }
];