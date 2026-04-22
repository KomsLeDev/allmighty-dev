import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Competence {
  nom: string;
  niveau: number;
  icone: string;
  estPhare: boolean;
}

export interface CategorieCompetence {
  categorie: string;
  items: Competence[];
}

export interface Experience {
  id: number;
  poste: string;
  entreprise: string;
  lieu: string;
  date_debut: string;
  date_fin: string;
  description: string;
  type: string;
  tags: string[];
}

export interface Projet {
  id: number;
  titre: string;
  categorie: string;
  description: string;
  contexte: string;
  technologies: string;
  technologiesArray: string[];
  image_url: string;
  lien_github: string;
  lien_demo: string;
  est_featured: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'https://allmighty.alwaysdata.net/api';

  constructor(private http: HttpClient) {}

  getCompetences(): Observable<{ success: boolean; data: CategorieCompetence[] }> {
    return this.http.get<any>(`${this.apiUrl}/competences.php`);
  }

  getExperiences(): Observable<{ success: boolean; emplois: Experience[]; formations: Experience[] }> {
    return this.http.get<any>(`${this.apiUrl}/experiences.php`);
  }

  getProjets(): Observable<{ success: boolean; total: number; data: Projet[] }> {
    return this.http.get<any>(`${this.apiUrl}/projets.php`);
  }
}