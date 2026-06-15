import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioService } from './services/portfolio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  messages: Message[] = [
    {
      from: 'bot',
      text: '👋 Bonjour ! Je suis votre assistant IA. Posez-moi une question sur mon parcours, mes compétences ou mes projets.',
      time: this.currentTime()
    }
  ];

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        const fullText = response?.answer || "Je n'ai pas reçu de réponse.";
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
        this.messages[botMsgIndex].text = 'Erreur : impossible de contacter le backend.';
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

  getSkillCategories(): string[] {
    if (!this.skills) return [];
    return Object.keys(this.skills);
  }

  getCategoryLabel(key: string): string {
    const labels: Record<string, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      base_de_donnees: 'Base de données',
      lowcode: 'Low-Code',
      outils: 'Outils',
      methodologies: 'Méthodologies'
    };
    return labels[key] || key;
  }

  goToProject(projectId: string): void {
    this.router.navigate(['/projet', projectId]);
  }
}