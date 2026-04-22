import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="scrolled">
      <a href="#hero" class="logo">
        <span class="logo-yk">YK</span><span class="logo-m">M</span><span class="logo-dot">.</span>
      </a>
      <ul class="nav-links">
        <li><a href="#about">À propos</a></li>
        <li><a href="#competences">Compétences</a></li>
        <li><a href="#experiences">Expériences</a></li>
        <li><a href="#projets">Projets</a></li>
        <li>
          <a href="https://github.com/KomsLeDev" target="_blank" class="nav-github">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </li>
      </ul>
      <button class="burger" (click)="toggleMenu()" [class.open]="menuOpen">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="mobile-menu" [class.open]="menuOpen">
      <a href="#about"       (click)="closeMenu()">À propos</a>
      <a href="#competences" (click)="closeMenu()">Compétences</a>
      <a href="#experiences" (click)="closeMenu()">Expériences</a>
      <a href="#projets"     (click)="closeMenu()">Projets</a>
      <a href="https://github.com/KomsLeDev" target="_blank" (click)="closeMenu()">GitHub</a>
    </div>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 4rem;
      transition: all 0.3s ease;
    }
    nav.scrolled {
      background: rgba(248,245,240,0.92);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      padding: 1rem 4rem;
      box-shadow: 0 1px 20px rgba(0,0,0,0.04);
    }
    .logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.4rem;
      letter-spacing: -0.03em;
      text-decoration: none;
      display: flex;
      align-items: baseline;
    }
    .logo-yk { color: #0f172a; }
    .logo-m  { color: #2563eb; }
    .logo-dot { color: #2563eb; font-size: 1.6rem; line-height: 0; }

    .nav-links {
      display: flex;
      list-style: none;
      align-items: center;
      gap: 2.5rem;
    }
    .nav-links a {
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #64748b;
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 0;
      width: 0; height: 1.5px;
      background: #2563eb;
      transition: width 0.2s;
    }
    .nav-links a:hover { color: #0f172a; }
    .nav-links a:hover::after { width: 100%; }

    .nav-github {
      display: flex !important;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.9rem !important;
      background: #0f172a !important;
      border-radius: 6px;
      color: #fff !important;
      font-size: 0.8rem !important;
      transition: background 0.2s !important;
    }
    .nav-github::after { display: none !important; }
    .nav-github:hover { background: #2563eb !important; color: #fff !important; }

    .burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }
    .burger span {
      display: block;
      width: 22px; height: 2px;
      background: #0f172a;
      border-radius: 2px;
      transition: all 0.3s;
    }
    .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .burger.open span:nth-child(2) { opacity: 0; }
    .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      position: fixed;
      inset: 0;
      background: #f8f5f0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .mobile-menu.open { opacity: 1; pointer-events: all; }
    .mobile-menu a {
      font-size: 1.75rem;
      font-weight: 700;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s;
    }
    .mobile-menu a:hover { color: #2563eb; }

    @media (max-width: 900px) {
      .nav-links { display: none; }
      .burger { display: flex; }
      nav { padding: 1.25rem 1.5rem; }
      nav.scrolled { padding: 1rem 1.5rem; }
    }
  `]
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }
  toggleMenu() { this.menuOpen = !this.menuOpen; document.body.style.overflow = this.menuOpen ? 'hidden' : ''; }
  closeMenu()  { this.menuOpen = false; document.body.style.overflow = ''; }
}