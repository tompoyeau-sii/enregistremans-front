// auth.service.ts

import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private stateService: StateService) { }

    seConnecter(nomUtilisateur: string, motDePasse: string): boolean {
        // Implémentez votre logique d'authentification et mettez à jour l'état
        const authReussie = /* Logique d'authentification réussie */ true;

        if (authReussie) {
            this.stateService.setUtilisateurConnecte(true);
            return true;
        } else {
            this.stateService.setUtilisateurConnecte(false);
            return false;
        }
    }

    estConnecte(): boolean {
        // Consultez l'observable dans le service partagé de manière synchrone
        return this.stateService.utilisateurConnecteSubject.value;
    }

    seDeconnecter(): void {
        // Déconnectez l'utilisateur et mettez à jour l'état
        this.stateService.setUtilisateurConnecte(false);
    }
}
