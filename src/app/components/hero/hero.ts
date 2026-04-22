import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="hero">
      <canvas #gridCanvas class="hero-canvas"></canvas>

      <div class="hero-inner">

        <div class="hero-eyebrow">
          <span class="dot"></span>
          Disponible · Développeur Web Fullstack
        </div>

        <div class="hero-name-block">
          <span class="hero-first">Yang</span>
          <span class="hero-last">Kong-Meng</span>
        </div>

        <p class="hero-sub">
          Diplômé Master MIAGE · Orléans<br>
          Spécialisé en <strong>Angular</strong>, <strong>React</strong>,
          <strong>Node.js</strong> &amp; <strong>Spring Boot</strong>
        </p>

        <div class="hero-chips">
          <span class="chip">SNCF</span>
          <span class="chip">CARSAT</span>
          <span class="chip">Power Platform</span>
          <span class="chip">Fullstack</span>
        </div>

        <div class="hero-actions">
          <a href="#experiences" class="btn-primary">Voir mon parcours</a>
          <a href="CV_km_yng.pdf" class="btn-secondary" target="_blank" download>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le CV
          </a>
          <a href="https://github.com/KomsLeDev" target="_blank" class="btn-github">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            KomsLeDev
          </a>
        </div>

      </div>

      <!-- Décoration droite -->
      <div class="hero-deco">
        <div class="deco-card">
          <span class="deco-num">2+</span>
          <span class="deco-label">ans d'alternance</span>
        </div>
        <div class="deco-card">
          <span class="deco-num">10+</span>
          <span class="deco-label">technologies</span>
        </div>
        <div class="deco-card">
          <span class="deco-num">4</span>
          <span class="deco-label">projets réalisés</span>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
      position: relative;
      overflow: hidden;
      padding: 8rem 4rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero-canvas {
      position: fixed;
      inset: 0;
      width: 100%; height: 100%;
      opacity: 0.12;
      pointer-events: none;
      z-index: 0;
    }
    .hero-inner {
      position: relative;
      z-index: 1;
      flex: 1;
      max-width: 620px;
    }

    /* EYEBROW */
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.78rem;
      font-weight: 500;
      color: #64748b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 2rem;
      animation: fadeUp 0.5s ease forwards;
      opacity: 0;
    }
    .dot {
      width: 7px; height: 7px;
      background: #22c55e;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    /* NAME */
    .hero-name-block {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      margin-bottom: 1.75rem;
      line-height: 1;
    }
    .hero-first {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0f172a;
  animation: fadeUp 0.5s ease forwards 0.1s;
  opacity: 0;
}
.hero-last {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0f172a;
  white-space: nowrap;
  animation: fadeUp 0.5s ease forwards 0.2s;
  opacity: 0;
}

    /* SUB */
    .hero-sub {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.8;
      margin-bottom: 1.75rem;
      animation: fadeUp 0.5s ease forwards 0.3s;
      opacity: 0;
    }
    .hero-sub strong { color: #334155; font-weight: 600; }

    /* CHIPS */
    .hero-chips {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 2.25rem;
      animation: fadeUp 0.5s ease forwards 0.4s;
      opacity: 0;
    }
    .chip {
      padding: 0.3rem 0.8rem;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 500;
      color: #475569;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    /* ACTIONS */
    .hero-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
      animation: fadeUp 0.5s ease forwards 0.5s;
      opacity: 0;
    }
    .btn-primary {
      padding: 0.8rem 1.75rem;
      background: #0f172a;
      color: #fff;
      font-weight: 600;
      font-size: 0.88rem;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s, transform 0.2s;
      letter-spacing: 0.01em;
    }
    .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
    .btn-secondary {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.8rem 1.5rem;
      border: 1.5px solid #e2e8f0;
      color: #334155;
      font-size: 0.88rem;
      font-weight: 600;
      border-radius: 8px;
      text-decoration: none;
      background: #fff;
      transition: border-color 0.2s, color 0.2s, transform 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .btn-secondary:hover { border-color: #2563eb; color: #2563eb; transform: translateY(-1px); }
    .btn-github {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.8rem 1.25rem;
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 500;
      border-radius: 8px;
      text-decoration: none;
      transition: color 0.2s;
    }
    .btn-github:hover { color: #0f172a; }

    /* DECO CARDS */
    .hero-deco {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
  animation: fadeUp 0.6s ease forwards 0.6s;
  opacity: 0;
}
.deco-card {
  background: #fff;
  border: 1px solid #e8e2da;
  border-radius: 10px;
  padding: 1.25rem 1.75rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  min-width: 140px;
}
.deco-num {
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: -0.03em;
  line-height: 1;
}
.deco-label {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.25rem;
  font-weight: 400;
}

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    @media (max-width: 900px) {
      .hero { flex-direction: column; padding: 7rem 1.5rem 3rem; gap: 3rem; }
      .hero-deco { flex-direction: row; flex-wrap: wrap; justify-content: center; }
      .deco-card { min-width: 100px; padding: 1rem 1.5rem; }
      .hero-last { white-space: normal; }
    }
    @media (max-width: 480px) {
      .hero-actions { flex-direction: column; }
      .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
    }
  `]
})
export class HeroComponent implements OnInit {
  @ViewChild('gridCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private mouseX = -999;
  private mouseY = -999;

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const GRID = 60;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / GRID) + 1;
      const rows = Math.ceil(canvas.height / GRID) + 1;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * GRID, py = y * GRID;
          const dist = Math.hypot(px - this.mouseX, py - this.mouseY);
          const glow = Math.max(0, 1 - dist / 350);
          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${0.06 + glow * 0.3})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
}