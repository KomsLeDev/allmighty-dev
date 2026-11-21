import { Routes } from '@angular/router';

const children = [
  {
    path: '',
    loadComponent: () => import('./app').then(m => m.App)
  },
  {
    path: 'projet/:id',
    loadComponent: () => import('./project-detail/project-detail').then(m => m.ProjectDetail)
  },
  {
    path: 'securite',
    loadComponent: () => import('./security-case-study/security-case-study').then(m => m.SecurityCaseStudy)
  }
];

export const routes: Routes = [
  { path: 'fr', data: { lang: 'fr' }, children },
  { path: 'en', data: { lang: 'en' }, children },
  {
    path: '**',
    loadComponent: () => import('./lang-redirect').then(m => m.LangRedirect)
  }
];
