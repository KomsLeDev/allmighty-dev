import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from './services/i18n';

@Component({
  selector: 'app-lang-redirect',
  standalone: true,
  template: '',
})
export class LangRedirect implements OnInit {
  constructor(private router: Router, private i18n: I18nService) {}

  ngOnInit(): void {
    const lang = this.i18n.detect();
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    // Preserve a legacy path (e.g. an old bookmarked "/projet/xxx" link) under the detected lang prefix.
    const rest = currentPath === '/' ? '' : currentPath;
    this.router.navigateByUrl(`/${lang}${rest}`, { replaceUrl: true });
  }
}
