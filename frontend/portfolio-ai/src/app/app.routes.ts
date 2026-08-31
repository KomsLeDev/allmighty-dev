import { Routes, UrlMatcher, UrlSegment, Route } from '@angular/router';

const langMatcher: UrlMatcher = (segments: UrlSegment[]) => {
  if (segments.length > 0 && (segments[0].path === 'fr' || segments[0].path === 'en')) {
    return { consumed: [segments[0]], posParams: { lang: segments[0] } };
  }
  return null;
};

export const routes: Routes = [
  {
    matcher: langMatcher,
    children: [
      {
        path: '',
        loadComponent: () => import('./app').then(m => m.App)
      },
      {
        path: 'projet/:id',
        loadComponent: () => import('./project-detail/project-detail').then(m => m.ProjectDetail)
      }
    ]
  } as Route,
  {
    path: '**',
    loadComponent: () => import('./lang-redirect').then(m => m.LangRedirect)
  }
];
