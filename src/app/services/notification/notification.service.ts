import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  showSuccess(message: string, htmlContent: string): void {
    // Code pour afficher une notification de succès

    this.messageService.add({
      severity: 'success',
      summary: message,
      detail: '',
      life: 3000, // Durée d'affichage de la notification en millisecondes.
    });
  }

  showError(message: string, htmlContent: string): void {
    // Code pour afficher une notification d'erreur

    this.messageService.add({
      severity: 'error',
      summary: message,
      detail: '',
      life: 3000, // Durée d'affichage de la notification en millisecondes.
    });
  }
   
}
