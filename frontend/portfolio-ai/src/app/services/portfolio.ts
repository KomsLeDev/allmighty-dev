import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { I18nService } from './i18n';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;
  private i18n = inject(I18nService);

  constructor(private http: HttpClient) {}

  private get lang(): string {
    return this.i18n.lang();
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/profile`, { params: { lang: this.lang } });
  }

  getProjects() {
    return this.http.get(`${this.apiUrl}/projects`, { params: { lang: this.lang } });
  }

  getSkills() {
    return this.http.get(`${this.apiUrl}/skills`);
  }

  getExperiences() {
    return this.http.get(`${this.apiUrl}/experiences`, { params: { lang: this.lang } });
  }

  sendMessage(message: string) {
    return this.http.post(`${this.apiUrl}/chat`, { message, lang: this.lang });
  }
}
