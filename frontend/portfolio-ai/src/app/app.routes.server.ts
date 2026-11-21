import { RenderMode, PrerenderFallback, ServerRoute } from '@angular/ssr';

const PROJECT_IDS = ['sncf-sav', 'carsat-rh', 'onlycraft', 'damage-detector', 'pandemic'];

export const serverRoutes: ServerRoute[] = [
  { path: 'fr', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: 'fr/securite', renderMode: RenderMode.Prerender },
  { path: 'en/securite', renderMode: RenderMode.Prerender },
  {
    path: 'fr/projet/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: async () => PROJECT_IDS.map(id => ({ id })),
  },
  {
    path: 'en/projet/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: async () => PROJECT_IDS.map(id => ({ id })),
  },
  { path: '**', renderMode: RenderMode.Client },
];
