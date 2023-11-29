/**
 * StateService - Service de gestion de l'état Angular
 * Ce service utilise BehaviorSubject pour gérer l'état de la connexion de l'utilisateur.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    // Observable représentant l'état actuel de la connexion de l'utilisateur
    utilisateurConnecteSubject = new BehaviorSubject<boolean>(false);
    utilisateurConnecte$ = this.utilisateurConnecteSubject.asObservable();

    /**
     * Constructeur du service StateService.
     * Initialise l'observable avec l'état initial récupéré depuis localStorage.
     */
    constructor() {
        // Récupérez l'état initial depuis localStorage
        const etatInitial = localStorage.getItem('utilisateurConnecte') === 'true';
        this.setUtilisateurConnecte(etatInitial);
    }

    /**
     * Met à jour l'état de la connexion de l'utilisateur.
     * @param etat - Nouvel état de la connexion (true si connecté, false sinon).
     */
    setUtilisateurConnecte(etat: boolean): void {
        // Mettez à jour l'état et stockez-le dans localStorage
        this.utilisateurConnecteSubject.next(etat);
        localStorage.setItem('utilisateurConnecte', etat.toString());
    }
}
