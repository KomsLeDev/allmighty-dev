import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService, Lang } from '../services/i18n';

@Component({
  selector: 'app-security-case-study',
  imports: [CommonModule],
  templateUrl: './security-case-study.html',
  styleUrl: './security-case-study.css'
})
export class SecurityCaseStudy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public i18n: I18nService
  ) {
    this.route.data.subscribe(data => this.i18n.sync(data['lang'] as string));
  }

  switchLang(lang: Lang): void {
    this.i18n.switchTo(lang);
  }

  goBack(): void {
    this.router.navigate(['/', this.i18n.lang()]);
  }
}
