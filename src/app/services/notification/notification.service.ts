/**
 * NotificationService - Service de notification Angular
 * Ce service utilise PrimeNG pour afficher des notifications de succès et d'erreur.
 */

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Constructeur du service NotificationService.
   * @param sanitizer - Service Angular pour sécuriser les valeurs dans les modèles.
   * @param messageService - Service de gestion des messages de PrimeNG.
   */
  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  /**
   * Affiche une notification de succès.
   * @param message - Message de succès à afficher.
   * @param htmlContent - Contenu HTML sécurisé pour la notification.
   */
  showSuccess(message: string, htmlContent: string): void {
    // Code pour afficher une notification de succès

    this.messageService.add({
      severity: 'success',
      summary: message,
      detail: '', // Sécurise le contenu HTML
      life: 3000, // Durée d'affichage de la notification en millisecondes.
    });
  }

  /**
   * Affiche une notification d'erreur.
   * @param message - Message d'erreur à afficher.
   * @param htmlContent - Contenu HTML sécurisé pour la notification.
   */
  showError(message: string, htmlContent: string): void {
    // Code pour afficher une notification d'erreur

    this.messageService.add({
      severity: 'error',
      summary: message,
      detail: '', // Sécurise le contenu HTML
      life: 3000, // Durée d'affichage de la notification en millisecondes.
    });
  }
}
