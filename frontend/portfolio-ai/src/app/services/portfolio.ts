import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://allmighty-dev-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  getProjects() {
    return this.http.get(`${this.apiUrl}/projects`);
  }

  getSkills() {
    return this.http.get(`${this.apiUrl}/skills`);
  }

  getExperiences() {
    return this.http.get(`${this.apiUrl}/experiences`);
  }

  sendMessage(message: string) {
    return this.http.post(`${this.apiUrl}/chat`, { message });
  }
}