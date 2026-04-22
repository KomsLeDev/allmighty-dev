import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { CompetencesComponent } from './components/competences/competences';
import { ExperiencesComponent } from './components/experiences/experiences';
import { ProjetsComponent } from './components/projets/projets';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    CompetencesComponent,
    ExperiencesComponent,
    ProjetsComponent,
    FooterComponent
  ]
})
export class AppComponent {}