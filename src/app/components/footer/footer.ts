import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <p>© Yang Kong-Meng · <span class="accent">allmighty-dev.fr</span></p>
      <p class="sub">Développé en Angular · PHP · MySQL</p>
    </footer>
  `,
  styles: [`
    footer {
      text-align: center;
      padding: 2.5rem;
      border-top: 1px solid #1f2d3d;
      color: #64748b;
      font-size: 0.85rem;
    }
    .accent { color: #00d4ff; }
    .sub { margin-top: 0.25rem; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
  `]
})
export class FooterComponent {}