import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PortfolioService } from './services/portfolio';
import { I18nService, Lang } from './services/i18n';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';

interface Message {
  from: 'user' | 'bot';
  text: string;
  time: string;
  typing?: boolean;
}

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  profile: any = null;
  projects: any[] = [];
  skills: any = {};
  experiences: any[] = [];
  isLoading = false;
  userMessage = '';
  robotMood: 'idle' | 'thinking' | 'talking' = 'idle';
  chatExpanded = false;
  zoomedImage: string | null = null;
  damageDetectorUrl = environment.damageDetectorUrl;

  messages: Message[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.i18n.sync(params.get('lang'));
      this.messages = [{ from: 'bot', text: this.i18n.t('chat.greeting'), time: this.currentTime() }];
      this.loadData();
    });
  }

  loadData(): void {
    this.portfolioService.getProfile().subscribe({
      next: (data: any) => {
        this.profile = data;
        this.cdr.detectChanges();
      }
    });

    this.portfolioService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data as any[];
        this.cdr.detectChanges();
      }
    });

    this.portfolioService.getSkills().subscribe({
      next: (data: any) => {
        this.skills = data;
        this.cdr.detectChanges();
      }
    });

    this.portfolioService.getExperiences().subscribe({
      next: (data: any) => {
        this.experiences = data as any[];
        this.cdr.detectChanges();
      }
    });
  }

  switchLang(lang: Lang): void {
    this.i18n.switchTo(lang);
  }

  toggleChatExpanded(): void {
    this.chatExpanded = !this.chatExpanded;
  }

  openZoom(src: string): void {
    this.zoomedImage = src;
  }

  closeZoom(): void {
    this.zoomedImage = null;
  }

  scrollToSection(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  currentTime(): string {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  sendMessage(): void {
    const message = this.userMessage.trim();
    if (!message || this.isLoading) return;

    this.messages = [...this.messages, { from: 'user', text: message, time: this.currentTime() }];
    this.userMessage = '';
    this.isLoading = true;
    this.robotMood = 'thinking';

    const botMsgIndex = this.messages.length;
    this.messages = [...this.messages, { from: 'bot', text: '', time: this.currentTime(), typing: true }];
    this.cdr.detectChanges();

    this.portfolioService.sendMessage(message).subscribe({
      next: (response: any) => {
        const fullText = response?.answer || this.i18n.t('chat.noAnswer');
        this.messages[botMsgIndex].typing = false;
        this.robotMood = 'talking';
        this.cdr.detectChanges();
        this.typeText(fullText, botMsgIndex, () => {
          this.robotMood = 'idle';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.messages[botMsgIndex].typing = false;
        this.messages[botMsgIndex].text = this.i18n.t('chat.error');
        this.robotMood = 'idle';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  typeText(fullText: string, index: number, onDone?: () => void): void {
    let i = 0;
    const interval = setInterval(() => {
      this.messages[index] = { ...this.messages[index], text: fullText.substring(0, i + 1) };
      i++;
      this.cdr.detectChanges();
      if (i >= fullText.length) {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, 18);
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  visibleProjects(): any[] {
    return this.projects.filter((p: any) => !p.linkedToExperience);
  }

  getSkillCategories(): string[] {
    if (!this.skills) return [];
    return Object.keys(this.skills);
  }

  getCategoryLabel(key: string): string {
    return this.i18n.t('skill.' + key);
  }

  goToProject(projectId: string): void {
    this.router.navigate(['/', this.i18n.lang(), 'projet', projectId]);
  }
}
